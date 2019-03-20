const keystone = require('keystone');
const auth0 = require('../auth');

const { category, problem, userSolution } = require('./problems');
const user = require('./user');
const { enforceRole, instructor, student } = require('./classroom');

const routes = {
  api: {
    category,
    problem,
    user,
    userSolution,
    classroom: { instructor, student },
  },
};


module.exports = (app) => {
  app.get('/', (req, res) => res.send('ok'));


  /* --- Middleware --- */


  app.use('/api', keystone.middleware.cors);
  app.options('/api*', (req, res) => res.sendStatus(200));


  /* --- API routes --- */


  app.get('/api', (req, res) => res.json({ status: 'ok' }));

  // These endpoints query the problem database and return public information

  app.get('/api/categories', routes.api.category.list);
  app.get('/api/category/:name', routes.api.category.get);

  app.get('/api/problem/:category/:name', routes.api.problem.get);

  // '/user' endpoints work with the user making the request

  app.get('/api/user', auth0(), routes.api.user.authenticated.get);
  app.patch('/api/user', auth0(), routes.api.user.authenticated.patch);
  app.put('/api/user/profile-image', auth0(), routes.api.user.authenticated.putProfileImage);
  app.post('/api/user', routes.api.user.post);

  app.get('/api/user/solutions', auth0(), routes.api.userSolution.list);
  app.get('/api/user/solution/:category/:problem', auth0(), routes.api.userSolution.get);
  app.put('/api/user/solution/:category/:problem', auth0(), routes.api.userSolution.put);
  app.get('/api/user/solution/check/:category/:problem', auth0(), routes.api.userSolution.check);

  // '/users' endpoints return information about other users

  app.get('/api/users/:username', routes.api.user.get);
  app.get('/api/user-check/username/:username', routes.api.user.checkUsername);
  app.get('/api/user-check/email/:email', routes.api.user.checkEmail);

  // '/classroom' endpoints work with classrooms

  app.get('/api/classroom/classrooms', auth0(), enforceRole('instructor'), routes.api.classroom.instructor.classrooms.list);
  app.get('/api/classroom/:code', auth0(), enforceRole('instructor'), routes.api.classroom.instructor.classrooms.get);
  app.post('/api/classroom/classrooms', auth0(), enforceRole('instructor'), routes.api.classroom.instructor.classrooms.post);
  app.delete('/api/classroom/:code', auth0(), enforceRole('instructor'), routes.api.classroom.instructor.classrooms.delete);

  app.get('/api/classroom/join/:code', auth0(), enforceRole('student'), routes.api.classroom.student.classroom.join);
  app.get('/api/classroom/leave', auth0(), enforceRole('student'), routes.api.classroom.student.classroom.leave);


  /* --- Post-route middleware --- */


  app.use(require('./util/auth-error-handle')); // eslint-disable-line global-require
};
