const keystone = require('keystone');

const User = keystone.list('User');
const Solution = keystone.list('Solution');

exports = module.exports = async function importUsers(done) {
  const solutions = await Solution.model.find();
  await Promise.all(solutions
    .map(solution => new Promise(async (resolve, reject) => {
      const { userId } = solution;
      // Find appropriate user
      const user = await User.model
        .findOne()
        .where('userId').equals(userId);
      // Add user to current solution
      Solution.updateItem(solution, { user }, err => (err ? reject : resolve)());
    })));

  done();
};
