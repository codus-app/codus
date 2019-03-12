const keystone = require('keystone');

const Problem = keystone.list('Problem');
const Solution = keystone.list('Solution');

/* eslint-disable camelcase */

module.exports = async function getUserSolvedProgress(user) {
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
