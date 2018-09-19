const auth0 = require('./auth');

/* eslint-disable global-require */
const routes = {
  api: require('./api'),
};
/* eslint-enable global-require */

module.exports = (app) => {
  app.get('/', (req, res) => res.send('ok'));

  app.get('/api', routes.api.base);

  app.get('/api/categories', routes.api.category.list);
  app.get('/api/category/:name', routes.api.category.get);

  app.get('/api/problem/:category/:name', routes.api.problem.get);

  app.get('/api/user/solutions', auth0(), routes.api.user.getSolutions);
};
