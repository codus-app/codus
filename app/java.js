// Some functions for validating / interacting with the names of Java types
/* eslint-disable object-shorthand, quote-props */

// Object mapping String versions of Java types to their equivalent JS type
module.exports.toJs = {
  'Integer': Number,
  'int': Number,
  'Double': Number,
  'double': Number,
  'String': String,
  'Boolean': Boolean,
  'boolean': Boolean,
  // Array forms
  'Integer[]': [Number],
  'int[]': [Number],
  'Double[]': [Number],
  'double[]': [Number],
  'String[]': [String],
  'Boolean[]': [Boolean],
  'boolean[]': [Boolean],
};

// Just a list of the Java type names
module.exports.types = Array.from(Object.keys(module.exports.toJs));

// Java keywords can't be used as identifiers
// From https://docs.oracle.com/javase/specs/jls/se7/html/jls-3.html#jls-3.9
module.exports.keywords = [
  'abstract', 'continue', 'for', 'new', 'switch',
  'assert', 'default', 'if', 'package', 'synchronized',
  'boolean', 'do', 'goto', 'private', 'this',
  'break', 'double', 'implements', 'protected', 'throw',
  'byte', 'else', 'import', 'public', 'throws',
  'case', 'enum', 'instanceof', 'return', 'transient',
  'catch', 'extends', 'int', 'short', 'try',
  'char', 'final', 'interface', 'static', 'void',
  'class', 'finally', 'long', 'strictfp', 'volatile',
  'const', 'float', 'native', 'super', 'while',
];

// Checks if a given string is a valid java identifier
module.exports.isValidIdentifier = function isValidIdentifier(obj) {
  // Certain names are illegal identifiers
  if (module.exports.keywords.includes(obj) || ['true', 'false', 'null'].includes(obj)) return false;
  // Sticking to the enligh alphabet because there's no easy way to do it properly
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(obj);
};

module.exports.javaStringToJS = function convertStringWithType(valueString, javaType) {
  const failureMessage = `Could not convert value "${valueString}" to ${javaType}`;
  if (!module.exports.types.includes(javaType)) throw new Error(`javaType must be one of ${module.exports.types.join(', ')}`);
  else {
    let valueString2 = valueString.trim();
    const jsType = module.exports.toJs[javaType];
    // Array: split array into each element, recur for each
    if (Array.isArray(jsType)) {
      if (!valueString2.startsWith('[') || !valueString2.endsWith(']')) throw new Error('For array conversions, valueString must be a properly formatted Java array (starting with [ and ending with ])');
      const elements = valueString2.slice(1, -1).split(',').map(val => val.trim()).filter(val => val.length);
      return elements.map(el => module.exports.javaStringToJS(el, javaType.slice(0, -2)));
    }
    // String: Use JSON.parse to safely get string value
    if (jsType === String) {
      if (valueString2.startsWith("'") && valueString2.endsWith("'")) {
        // If the string is single-quoted, escape all double quotes and replace the beginning/end
        // with double quotes
        valueString2 = `"${valueString2.slice(1, -1).replace(/"/g, '\\"')}"`;
      }
      // Use JSON.parse for easy safe string eval
      return JSON.parse(valueString2);
    }
    // Number: Parse with Number constructor
    if (jsType === Number) {
      const out = Number(valueString2);
      if (Number.isNaN(out)) throw new Error(failureMessage);
      return out;
    }
    // Boolean: simple parse logic
    if (jsType === Boolean) {
      if (!['true', 'false'].includes(valueString2)) throw new Error(failureMessage);
      return { 'true': true, 'false': false }[valueString2];
    }
    throw new Error('Something went wrong');
  }
};
