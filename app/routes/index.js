/* eslint-disable global-require */
const routes = {
  api: require('./api'),
};
/* eslint-enable global-require */

module.exports = (app) => {
  app.get('/', (req, res) => res.send('ok'));

  app.get('/api', routes.api.base);
};
