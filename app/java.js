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
