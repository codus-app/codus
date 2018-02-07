// Higher-level database functions

const models = require('./models');
const db = require('./connection');


// Query the database for a user and return all info
module.exports.getUser = {
  // Find a user with a given auth0 ID
  async byAuth0(sub) {
    await db.ready;
    const user = await models.User
      .findOne()
      .where('auth0_id').equals(sub);
    return user;
  },
  byId(sub) { return this.byAuth0(sub); },
};


// Query the database for one or more problems and return all info
module.exports.getProblem = module.exports.getProblems = {
  // Find a single problem by its name
  async byName(name) {
    await db.ready;
    const problem = await models.Problem
      .findOne()
      .where('name').equals(name);
    return problem;
  },

  // Return info about all of the problems in a category
  async byCategory(cat) {
    await db.ready;
    const problems = await models.Problem
      .find()
      .where('category').equals(cat);
    return problems;
  },
};
