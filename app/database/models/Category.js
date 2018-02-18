const mongoose = require('mongoose');
const connection = require('../connection');
const Problem = require('./Problem');


const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  problems: [String],
});

// Get all of the problem documents referenced by this category
categorySchema.methods.getProblems = async function getProblems() {
  await connection.ready;
  return Problem
    .find()
    .where('category').equals(this.name)
    .where('name').in(this.problems);
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
