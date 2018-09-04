const keystone = require('keystone');

require('dotenv').config();

keystone.init({
  name: 'codus',
  auth: true,
  'user model': 'AdminUser',
  'cookie secret': process.env.KEYSTONE_COOKIE_SECRET,

  port: 8081,

  'auto update': true,
});

keystone.import('models');

keystone.start();
