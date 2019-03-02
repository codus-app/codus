const keystone = require('keystone');

const User = keystone.list('User');
const Problem = keystone.list('Problem');
const Solution = keystone.list('Solution');

/* eslint-disable camelcase */

module.exports = async function getUserSolvedProgress(user_id) {
  const user = await User.model
    .findOne()
    .where('userId').equals(user_id);

  return Promise.all([
    // Number of correct solutions
    Solution.model
      .count()
      .where('user').equals(user._id)
      .where('passed').equals(true),

    // Total number of problems
    Problem.model.count(),
  ]);
};
