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


module.exports.getProblem = async function getProblem(category, name) {
  await db.ready;
  const problem = await models.Problem
    .findOne()
    .where('category').equals(category)
    .where('name').equals(name);
  return problem;
};

// Query the database for one or more problems and return all info
module.exports.getProblems = {
  // Return all the problems with the given names
  async byNames(category, names) {
    await db.ready;
    const problems = await models.Problem
      .find()
      .where('category').equals(category)
      .where('name').in(names);
    return problems;
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
