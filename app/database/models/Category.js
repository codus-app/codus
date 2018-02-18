const mongoose = require('mongoose');
const connection = require('../connection');
const Problem = require('./Problem');


const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  problems: [String],
});

// Get all of the problem documents referenced by this category
categorySchema.methods.getProblems = async function getProblems(strip = false) {
  await connection.ready;
  return Problem
    .find()
    .where('category').equals(this.name)
    .where('name').in(this.problems)
    .select(strip ? '-_id -__v' : ''); // Remove _id and __v properties if strip is passed
};
// Get the user's solution to each problem referenced by this category
categorySchema.methods.getSolutions = async function getSolutions(user) {
  return Promise.all(this.problems.map(problemName => user.getSolution(problemName)))
    // Replace 'undefined' solutions with an object containing the name of the problem.
    .then(solutions => solutions.map((s, i) => s || { name: this.problems[i] }));
};
// Add a mongoose problem document to the category
categorySchema.methods.addProblem = async function addProblem(problem) {
  if (problem && !this.problems.includes(problem.name)) {
    this.problems.push(problem.name); // Add to category's record
    await this.save();
    // Problem should have its category property set to this
    problem.category = this.name();
    await problem.save();
  }
};
// Remove a problem from the category
categorySchema.methods.removeProblem = async function removeProblem(problem) {
  if (problem && this.problems.includes(problem.name)) {
    this.problems.pull(problem.name); // Remove from category's record
    await this.save();
    // Problem should no longer reference this category
    problem.category = undefined;
    problem.save();
  }
};

module.exports = mongoose.model('Category', categorySchema);
