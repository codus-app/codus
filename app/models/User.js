// Defines mongoose model for a user, containing their corresponding Auth0 ID and basic information
// on all of their problem solutions

/* eslint-disable newline-per-chained-call */

const mongoose = require('mongoose');
const javaExec = require('codus-execute-java');

const Problem = require('./Problem');


// Schema for a solution. This contains the name (unique) of a problem described in the Problems
// collection, as well as the user's solution and whether the solution passes tests.
const solutionSchema = new mongoose.Schema({
  name: {
    type: String,
    // name must be in the problems collection
    validate: {
      isAsync: true,
      validator: (name, cb) => Problem.findOne().where('name').equals(name).then(r => !!r).then(cb),
    },
  },
  code: String,
  passed: Boolean,
});
solutionSchema.methods.check = async function checkSolution() {
  const problem = await Problem.findOne().where('name').equals(this.name);
  const results = await javaExec(problem, this.code);
  if (results.error) throw new Error(results.error); // If an error arises, throw it
  const tests = results.data;
  // Record results in database
  const failedTests = tests.filter(t => !t.pass);
  this.passed = failedTests.length > 0;

  return { tests, pass: this.passed };
};


// Schema for a user. The only profile information stored is their Auth0 ID, which allows access to
// all the rest of the user data from Auth0's database. MongoDB users are essentially just a
// container for user solutions, containing as little identification information as possible
const userSchema = new mongoose.Schema({
  auth0_id: String,
  solutions: [solutionSchema],
});
// Get the subdocument describing one of the user's solutions
userSchema.methods.getSolution = async function getSolution(problemName) {
  // module.exports is the User model
  return module.exports
    .findOne()
    .where('auth0_id').equals(this.auth0_id)
    .where('solutions.name').equals(problemName)
    .then((results) => {
      if (!results) return undefined;
      // For some reason the object returned in results isn't connected to the parent right, so
      // after we get a results object, we find that same object again by its id, the result of
      // which seems to be connected better.
      return this.solutions.id(results.solutions[0]._id);// eslint-disable-line no-underscore-dangle
    });
};
// Add a problem solution to the user's data
userSchema.methods.addSolution = async function addSolution(problemName, code) {
  this.solutions.push({ name: problemName, code, passed: undefined });
  await this.save();
};
// Change one of the user's already-existing solutions
userSchema.methods.changeSolution = async function changeSolution(problemName, code) {
  const solution = await this.getSolution(problemName);
  if (typeof solution === 'undefined') throw new Error(`Could not update solution to ${problemName} because no existing solution was found`);
  // Update
  Object.assign(solution, { code, passed: undefined }); // We no longer know whether the code passes
  await this.save();
};


module.exports = mongoose.model('User', userSchema);
