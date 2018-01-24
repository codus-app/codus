// Higher-level database functions

const models = require('./models');
const db = require('./db');


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
};
