const keystone = require('keystone');
const bodyParser = require('body-parser');

require('dotenv').config();

keystone.init({
  name: 'codus',
  brand: 'Codus',
  auth: true,
  'user model': 'AdminUser',
  'cookie secret': process.env.KEYSTONE_COOKIE_SECRET,

  mongo: process.env.MONGO_URI || 'mongodb://localhost/codus',

  'auto update': true,

  port: 3000,
});

keystone.import('models');

keystone.set('routes', require('./routes')); // eslint-disable-line import/newline-after-import
keystone.set('handle uploads', false);
keystone.set('pre:bodyparser', (app) => { app.use(bodyParser.text()); });

keystone.set('nav', {
  content: ['problems', 'categories'],
  users: ['users', 'solutions'],
  classes: ['classrooms', 'assignments'],
});
keystone.set('back url', process.env.HOMEPAGE || 'https://codus.io/');

keystone.start();

// Misc express config
keystone.app.set('json spaces', 2);
keystone.set('cors allow origin', true);
keystone.set('cors allow methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
