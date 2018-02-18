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

module.exports.getCategory = async function getCategory(categoryName) {
  await db.ready;
  const category = await models.Category
    .findOne()
    .where('name').equals(categoryName);
  return category;
};
