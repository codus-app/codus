const keystone = require('keystone');
const auth0 = require('../auth');

const { category, problem, userSolution } = require('./problems');
const user = require('./user');
const {
  fetchUser,
  enforceRole,
  roleSwitch,
  fetchClassroom,

  instructor: instructorRoutes,
  student: studentRoutes,
} = require('./classroom');

const routes = {
  api: {
    category,
    problem,
    user,
    userSolution,
    classroom: { instructor: instructorRoutes, student: studentRoutes },
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

  const { instructor, student } = routes.api.classroom;

  // Instructor routes

  // Middleware for instructor routes
  const instructorMiddleware = [...auth0(), fetchUser, enforceRole('instructor')];
  const instructorMiddleware2 = [...instructorMiddleware, fetchClassroom];

  app.get('/api/classroom/classrooms', instructorMiddleware, instructor.classrooms.list);
  app.post('/api/classroom/classrooms', instructorMiddleware, instructor.classrooms.post);
  // app.get('/api/classrom/:classroomCode') defined below
  app.delete('/api/classroom/:classroomCode', instructorMiddleware2, instructor.classrooms.delete);
  app.delete('/api/classroom/:classroomCode/students/:username', instructorMiddleware2, instructor.classrooms.removeUser);
  app.get('/api/classroom/:classroomCode/assignments', instructorMiddleware2, instructor.assignments.list);
  app.get('/api/classroom/:classroomCode/assignments/:assignmentCode', instructorMiddleware2, instructor.assignments.get);
  app.post('/api/classroom/:classroomCode/assignments', instructorMiddleware2, instructor.assignments.post);
  app.put('/api/classroom/:classroomCode/assignments/:assignmentCode', instructorMiddleware2, instructor.assignments.put);
  app.delete('/api/classroom/:classroomCode/assignments/:assignmentCode', instructorMiddleware2, instructor.assignments.delete);

  // Student routes

  // Middleware for student routes
  const studentMiddleware = [...auth0(), fetchUser, enforceRole('student')];

  app.get('/api/classroom/join/:classroomCode', studentMiddleware, fetchClassroom, student.classroom.join);
  app.get('/api/classroom', studentMiddleware, fetchClassroom, student.classroom.get);
  // app.get('/api/classrom/:classroomCode') defined below
  app.get('/api/classroom/leave', studentMiddleware, fetchClassroom, student.classroom.leave);

  // "Switched" routes available to students and instructors with different handlers for each

  app.get('/api/classroom/:classroomCode', [...auth0(), fetchUser, fetchClassroom], roleSwitch({
    student: student.classroom.get,
    instructor: instructor.classrooms.get,
  }));


  /* --- Post-route middleware --- */


  app.use(require('./util/auth-error-handle')); // eslint-disable-line global-require
};
