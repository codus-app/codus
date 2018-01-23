// Higher-level database functions

const models = require('./models');
const db = require('./db');


// Query the database for a user with a given auth0 ID and return all info
module.exports.getUser = async function getUser(sub) {
  await db.ready;
  const user = await models.User
    .findOne()
    .where('auth0_id').equals(sub);
  return user;
};
