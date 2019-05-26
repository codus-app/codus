const keystone = require('keystone');
const HTTPError = require('../util/error');

const User = keystone.list('User');
const Classroom = keystone.list('Classroom');

async function fetchUser(req, res, next) {
  req.user2 = await User.model
    .findOne()
    .where('userId').equals(req.user.sub);
  next();
}

/** Protect a route on the condition that the authenticated user has a given role */
function enforceRole(role) {
  return async (req, res, next) => {
    // Require userFetch middleware to precede this middleware
    if (!req.user2) return new HTTPError('Route misconfigured').handle(res);
    // Error if role doesn't match
    if (req.user2.role !== role) return new HTTPError(403, `Authenticated user must have role: ${role}`).handle(res);
    return next();
  };
}

/**
 * Use a different route handler depending on whether the authenticated user is a student or an
 * instructor
 */
function roleSwitch(handlers) {
  return async (req, res) => {
    // Require userFetch middleware to precede this middleware
    if (!req.user2) return new HTTPError('Route misconfigured').handle(res);
    // Call handler corresponding to user role
    return handlers[req.user2.role](req, res);
  };
}

/**
 * Fetch a classroom from a code passed in a classroomCode paramater. For students, fall back to the
 * classroom they belong to.
 */
async function fetchClassroom(req, res, next) {
  let classroom;
  // Require userFetch middleware to precede this middleware
  if (!req.user2) return new HTTPError('Route misconfigured').handle(res);
  const { role } = req.user2;

  if (req.params.classroomCode) {
    const { classroomCode } = req.params;
    classroom = await Classroom.model
      .findOne()
      .where('code').equals(classroomCode)
      .select('-__v');
    // Can't find classroom
    if (!classroom) return new HTTPError(404, `Classroom '${req.params}' was not found`).handle(res);
    // Instructor requesting classroom they don't own
    if (role === 'instructor' && !classroom.instructor.equals(req.user2._id)) {
      return new HTTPError(403, `You don't own classroom ${classroomCode}`).handle(res);
    }
  // For students, if no classroom is passed, use the classroom to which the student belongs
  } else if (role === 'student') {
    if (!req.user2.classroom) classroom = null;
    else classroom = await Classroom.model.findById(req.user2.classroom.toString());
  } else {
    return new HTTPError(400, 'classroomCode is required').handle(res);
  }

  req.classroom = classroom;
  return next();
}


/* eslint-disable global-require */
module.exports = {
  fetchUser,
  enforceRole,
  roleSwitch,
  fetchClassroom,
  student: require('./student'),
  instructor: require('./instructor'),
};
