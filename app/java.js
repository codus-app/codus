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
