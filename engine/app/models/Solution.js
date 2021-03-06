const keystone = require('keystone');
const javaExec = require('codus-execute-java');

const { Types } = keystone.Field;

const Solution = new keystone.List('Solution');

Solution.add({
  user: { type: Types.Relationship, ref: 'User', initial: true, required: true },
  problem: { type: Types.Relationship, ref: 'Problem', initial: true, required: true },
  code: { type: Types.Code, language: 'java', initial: true },
  passed: { type: Types.Boolean, initial: true },
});

Solution.schema.methods.check = async function checkSolution(saveResults = true) {
  const problem = await keystone.list('Problem').model
    .findById(this.problem.toString());

  // Test code
  const results = await javaExec({
    ...problem.toObject(),
    // Replace testCases and parameters with richer forms from virtuals
    testCases: problem.testCases2,
    parameters: problem.parameters2,
  }, this.code);

  if (results.error) throw new Error(results.error);
  const tests = results.data
    .map((t, i) => ({ ...t, hidden: problem.testCases2[i].hidden }));
  const passed = tests.every(t => t.pass);

  if (saveResults) {
    return new Promise((resolve, reject) => {
      Solution.updateItem(this, { passed }, (error) => {
        if (error) reject(error);
        else resolve({ tests, passed });
      });
    });
  }
  return Promise.resolve({ tests, passed });
};

Solution.register();

Solution.defaultColumns = 'user, problem, passed';
