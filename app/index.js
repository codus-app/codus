const keystone = require('keystone');

require('dotenv').config();

keystone.init({
  name: 'codus',
  auth: true,
  'user model': 'AdminUser',
  'cookie secret': process.env.KEYSTONE_COOKIE_SECRET,

  port: 3001,
});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.start();

// Misc express config

keystone.app.set('json spaces', 2);
