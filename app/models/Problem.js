const mongoose = require('mongoose');
const java = require('../java');


// Schema for defining a single parameter in a problem
const parameterSchema = new mongoose.Schema({
  // The name of the parameter has to be a valid Java identifier
  name: { type: String, validate: java.isValidIdentifier },
  // Type should be one of the Java type names defined in the java module
  type: { type: String, enum: java.types },
}, { _id: false });


// Schema for a test case
const testCaseSchema = new mongoose.Schema({
  parameters: [mongoose.Schema.Types.Mixed],
  result: mongoose.Schema.Types.Mixed,
}, { _id: false });


// Schema for an entire problem, containing its parameters and return type, and a set of test cases,
//  as well its name and category
const problemSchema = new mongoose.Schema({
  // name is a unique String
  name: { type: String, unique: true },
  // category is a string (not unique)
  category: String,
  // parameters should be an array of objects with name and type
  parameters: [parameterSchema],
  // resultType should be a String representing Java type
  resultType: { type: String, enum: java.types },
  // testCases should be an array of objects, each defining a set of parameters and an expected
  // result
  testCases: [testCaseSchema],
});


module.exports = mongoose.model('Problem', problemSchema);
