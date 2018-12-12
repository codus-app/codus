const keystone = require('keystone');
const auth0 = require('./auth');

/* eslint-disable global-require */
const routes = {
  api: require('./api'),
};
/* eslint-enable global-require */

module.exports = (app) => {
  app.get('/', (req, res) => res.send('ok'));


  /* --- Middleware --- */


  app.use('/api', keystone.middleware.cors);
  app.options('/api*', (req, res) => res.sendStatus(200));


  /* --- API routes --- */


  app.get('/api', routes.api.base);

  // These endpoints query the problem database and return public information

  app.get('/api/categories', routes.api.category.list);
  app.get('/api/category/:name', routes.api.category.get);

  app.get('/api/problem/:category/:name', routes.api.problem.get);

  // '/user' endpoints work with the user making the request

  app.get('/api/user', auth0(), routes.api.user.authenticated.get);
  app.patch('/api/user', auth0(), routes.api.user.authenticated.patch);
  app.post('/api/user', routes.api.user.post);

  app.get('/api/user/solutions', auth0(), routes.api.userSolution.list);
  app.get('/api/user/solution/:category/:problem', auth0(), routes.api.userSolution.get);
  app.put('/api/user/solution/:category/:problem', auth0(), routes.api.userSolution.put);
  app.get('/api/user/solution/check/:category/:problem', auth0(), routes.api.userSolution.check);

  // '/users' endpoints return information about other users

  app.get('/api/users/:username', routes.api.user.get);
  app.get('/api/user-check/username/:username', auth0(), routes.api.user.checkUsername);
  app.get('/api/user-check/email/:email', routes.api.user.checkEmail);


  /* --- Post-route middleware --- */


  app.use(require('./authErrorHandle')); // eslint-disable-line global-require
};
