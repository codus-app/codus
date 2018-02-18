// Higher-level database functions

const models = require('./models');
const db = require('./connection');


// Query the database for the user with a given Auth0 ID and return all info
module.exports.getUser = async function getUser(sub, strip = false) {
  await db.ready;
  return models.User
    .findOne()
    .where('auth0_id').equals(sub)
    .select(strip ? '-_id -__v' : ''); // Remove _id and __v properties if strip is passed
};

// Find a problem in a given category with a given name
module.exports.getProblem = async function getProblem(category, name, strip = false) {
  await db.ready;
  return models.Problem
    .findOne()
    .where('category').equals(category)
    .where('name').equals(name)
    .select(strip ? '-_id -__v' : ''); // Remove _id and __v properties if strip is passed
};

// Get the names of all categories
module.exports.getCategories = async function getCategories(strip = false) {
  await db.ready;
  return models.Category
    .find()
    .select(strip ? '-_id -__v' : ''); // Remove _id and __v properties if strip is passed
};

// Get a single Category by name
module.exports.getCategory = async function getCategory(categoryName, strip = false) {
  await db.ready;
  return models.Category
    .findOne()
    .where('name').equals(categoryName)
    .select(strip ? '-_id -__v' : ''); // Remove _id and __v properties if strip is passed
};
