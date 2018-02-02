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
  solution: String,
  passed: Boolean,
});
solutionSchema.methods.check = async function checkSolution() {
  const problem = await Problem.findOne().where('name').equals(this.name);
  return javaExec(problem, this.solution);
};


// Schema for a user. The only profile information stored is their Auth0 ID, which allows access to
// all the rest of the user data from Auth0's database. MongoDB users are essentially just a
// container for user solutions, containing as little identification information as possible
const userSchema = new mongoose.Schema({
  auth0_id: String,
  solutions: [solutionSchema],
});
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
userSchema.methods.addSolution = async function addSolution(problemName, code, passed) {
  if (typeof passed === 'undefined') { /* TODO: evaluate user's solution ? */ }
  this.solutions.push({ name: problemName, solution: code, passed });
  await this.save();
};
// Change the user's solution to an already-completed problem
userSchema.methods.changeSolution = async function changeSolution(problemName, code, passed) {
  if (typeof passed === 'undefined') { /* TODO: evaluate user's solution ? */ }
  // Get existing solution
  const solution = await this.getSolution(problemName);

  if (typeof solution !== 'undefined') {
    // If existing solution exists, update
    solution.solution = code;
    solution.passed = passed;
    await this.save();
  } else {
    // If there's no existing solution, add one
    await this.addSolution(problemName, code, passed);
  }
};


module.exports = mongoose.model('User', userSchema);
