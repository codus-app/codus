const keystone = require('keystone');
const auth0 = require('./auth');

/* eslint-disable global-require */
const routes = {
  api: require('./api'),
};
/* eslint-enable global-require */

module.exports = (app) => {
  app.get('/', (req, res) => res.send('ok'));

  // Cors
  app.use('/api', keystone.middleware.cors);
  app.options('/api*', (req, res) => res.send(200));

  app.get('/api', routes.api.base);

  app.get('/api/categories', routes.api.category.list);
  app.get('/api/category/:name', routes.api.category.get);

  app.get('/api/problem/:category/:name', routes.api.problem.get);

  app.get('/api/user', auth0(), routes.api.user.get);

  app.get('/api/user/solutions', auth0(), routes.api.userSolution.list);
  app.get('/api/user/solution/:category/:problem', auth0(), routes.api.userSolution.get);
  app.put('/api/user/solution/:category/:problem', auth0(), routes.api.userSolution.put);
  app.get('/api/user/solution/check/:category/:problem', auth0(), routes.api.userSolution.check);


  /* eslint-disable global-require */
  app.use(require('./authErrorHandle'));
  /* eslint-enable global-require */
};
