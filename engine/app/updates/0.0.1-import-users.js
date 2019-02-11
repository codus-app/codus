require('dotenv').config();

const keystone = require('keystone');
const auth = require('../auth');

const User = keystone.list('User');

const { management } = auth;

exports = module.exports = function importUsers(done) {
  console.log('Fetching users');
  management.getUsers().then((users) => {
    console.log('Users fetched');
    console.log('Saving users');
    Promise.all(users.map(user => new Promise((resolve) => {
      new User.model({ userId: user.user_id }).save(resolve); // eslint-disable-line new-cap
    }))).then(() => done()).then(() => console.log('Users saved'));
  });
};
