const keystone = require('keystone');

const User = keystone.list('User');

exports = module.exports = async function addRoles(done) {
  const users = await User.model.find();
  await Promise.all(users.map(user => new Promise((resolve, reject) => {
    if (!user.role) {
      User.updateItem(user, { role: 'student' }, err => (err ? reject : resolve)());
    } else {
      resolve();
    }
  })));
  done();
};
