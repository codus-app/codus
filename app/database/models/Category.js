const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  problems: [String],
});

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
