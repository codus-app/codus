const keystone = require('keystone');

require('dotenv').config();

keystone.init({
  name: 'codus',
  auth: true,
  'user model': 'AdminUser',
  'cookie secret': process.env.KEYSTONE_COOKIE_SECRET,
  mongo: process.env.MONGO_URI || 'mongodb://localhost/codus',

  'auto update': true,

  port: 3000,
});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.start();

// Misc express config
keystone.app.set('json spaces', 2);
keystone.set('cors allow origin', true);
keystone.set('cors allow methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
