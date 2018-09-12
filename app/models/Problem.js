const keystone = require('keystone');
const java = require('../java');


const { Types } = keystone.Field;

const Problem = new keystone.List('Problem');

Problem.add({
  name: { type: Types.Text, initial: true, required: true },
  category: {
    type: Types.Relationship,
    ref: 'Category',
    initial: true,
    required: true,
  },
  description: { type: Types.Markdown, initial: true, required: true },

  parameters: {
    type: Types.TextArray,
    note: 'Formatted as name|type',
    initial: true,
    required: true,
    validate: {
      validator: arr => arr.every(val => val.includes('|')) && arr
        .map(val => val.split('|').map(s => s.trim()))
        .every(([name, type]) => java.isValidIdentifier(name) && java.types.includes(type)),
      message: `Each parameter must be formatted as name|type where name is a valid Java identifier and type is a supported Java type (one of ${java.types.join(', ')})`,
    },
  },

  resultType: {
    type: Types.Text,
    initial: true,
    required: true,
    validate: {
      validator: val => java.types.includes(val),
      message: `Result must be a valid Java type (one of ${java.types.join(', ')})`,
    },
  },

  // Each test case should take the format "arg1, arg2, arg3 -> expectedResult"
  testCases: {
    type: Types.TextArray,
    note: 'Formatted as arg1, arg2, arg3... -> expectedResult',
    initial: true,
    required: true,
    validate: {
      validator: arr => arr.every(val => val.includes('->')),
      message: 'Test case must contain both parameters and expected result, separated by "->"',
    },
  },
});

Problem.schema.methods.getTestCases = function getTestCases() {
  console.log(this);
  const functionParams = this.parameters.map(p => p.split('|').map(s => s.trim()));
  const paramTypes = functionParams.map(p => p[1]);

  return this.testCases
    // Split parameters out from expected result
    .map(t => t.split('->').map(part => part.trim()))
    .map(([parameters, expectedResult]) => ({
      parameters: parameters
        // Split up parameters
        .split(',').map(param => param.trim()) // split out each parameter
        // Convert each parameter to the correct JS type
        .map((param, i) => java.javaStringToJS(param, paramTypes[i])),

      // Convert result to the correct JS type
      result: java.javaStringToJS(expectedResult, this.resultType),
    }));
};


Problem.register();

Problem.defaultColumns = 'name, category, resultType';
