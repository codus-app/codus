// Defines mongoose model for a user, containing their corresponding Auth0 ID and basic information
// on all of their problem solutions

const mongoose = require('mongoose');

const Problem = require('./Problem');


// Schema for a solution. This contains the name (unique) of a problem described in the Problems
// collection, as well as the user's solution and whether the solution passes tests.
const solutionSchema = new mongoose.Schema({
  name: {
    type: String,
    // name must be in the problems collection
    validate: (name, cb) => Problem.findOne().where('name').equals(name)
      .then(r => !!r) // Convert to boolean
      .then(cb),
  },
  solution: String,
  passed: Boolean,
});

// Schema for a user. The only profile information stored is their Auth0 ID, which allows access to
// all the rest of the user data from Auth0's database. MongoDB users are essentially just a
// container for user solutions, containing as little identification information as possible
const userSchema = new mongoose.Schema({
  auth0_id: String,
  solutions: [solutionSchema],
});

module.exports = mongoose.model('User', userSchema);
