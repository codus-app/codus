// Higher-level database functions

const models = require('./models');
const db = require('./connection');


// Query the database for the user with a given Auth0 ID and return all info
module.exports.getUser = async function getUser(sub) {
  await db.ready;
  return models.User
    .findOne()
    .where('auth0_id').equals(sub);
};

// Find a problem in a given category with a given name
module.exports.getProblem = async function getProblem(category, name) {
  await db.ready;
  return models.Problem
    .findOne()
    .where('category').equals(category)
    .where('name').equals(name);
};

// Get the names of all categories
module.exports.getCategories = async function getCategories() {
  await db.ready;
  return models.Category
    .find()
    .select('name')
    .then(cats => cats.map(c => c.name)); // Return the name field of each object
};

// Get a single Category by name
module.exports.getCategory = async function getCategory(categoryName) {
  await db.ready;
  return models.Category
    .findOne()
    .where('name').equals(categoryName);
};
