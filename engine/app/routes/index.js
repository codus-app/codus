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

  // Instructor routes
  const instructor = [...auth0(), fetchUser, enforceRole('instructor')]; // Middleware for instructor routes
  app.get('/api/classroom/classrooms', instructor, routes.api.classroom.instructor.classrooms.list);
  app.post('/api/classroom/classrooms', instructor, routes.api.classroom.instructor.classrooms.post);
  // app.get('/api/classrom/:classroomCode') defined below
  app.delete('/api/classroom/:classroomCode', instructor, fetchClassroom, routes.api.classroom.instructor.classrooms.delete);
  app.delete('/api/classroom/:classroomCode/students/:username', instructor, fetchClassroom, routes.api.classroom.instructor.classrooms.removeUser);
  app.get('/api/classroom/:classroomCode/assignments', instructor, fetchClassroom, routes.api.classroom.instructor.assignments.list);
  app.get('/api/classroom/:classroomCode/assignments/:assignmentCode', instructor, fetchClassroom, routes.api.classroom.instructor.assignments.get);
  app.post('/api/classroom/:classroomCode/assignments', instructor, fetchClassroom, routes.api.classroom.instructor.assignments.post);
  app.put('/api/classroom/:classroomCode/assignments/:assignmentCode', instructor, fetchClassroom, routes.api.classroom.instructor.assignments.put);

  // Student routes
  const student = [...auth0(), fetchUser, enforceRole('student')];
  app.get('/api/classroom/join/:classroomCode', student, fetchClassroom, routes.api.classroom.student.classroom.join);
  app.get('/api/classroom', student, fetchClassroom, routes.api.classroom.student.classroom.get);
  // app.get('/api/classrom/:classroomCode') defined below
  app.get('/api/classroom/leave', student, fetchClassroom, routes.api.classroom.student.classroom.leave);

  // "Switched" routes available to students and instructors with different handlers for each
  app.get('/api/classroom/:classroomCode', [...auth0(), fetchUser, fetchClassroom], roleSwitch({
    student: routes.api.classroom.student.classroom.get,
    instructor: routes.api.classroom.instructor.classrooms.get,
  }));


  /* --- Post-route middleware --- */


  app.use(require('./util/auth-error-handle')); // eslint-disable-line global-require
};
