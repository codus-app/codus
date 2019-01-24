const user = require('./user');
const problems = require('./problems');

module.exports = {
  ...user,
  ...problems,
};
