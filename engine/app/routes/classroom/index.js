const keystone = require('keystone');
const HTTPError = require('../util/error');

const User = keystone.list('User');

/** Protect a route on the condition that the authenticated user has a given role */
function enforceRole(role) {
  return async (req, res, next) => {
    req.user2 = await User.model
      .findOne()
      .where('userId').equals(req.user.sub);

    if (req.user2.role !== role) new HTTPError(403, `Authenticated user must have role: ${role}`).handle(res);
    else next();
  };
}

/**
 * Use a different route handler depending on whether the authenticated user is a student or an
 * instructor
 */
function roleSwitch(handlers) {
  return async (req, res) => {
    req.user2 = await User.model
      .findOne()
      .where('userId').equals(req.user.sub);

    return handlers[req.user2.role](req, res);
  };
}


/* eslint-disable global-require */
module.exports = {
  enforceRole,
  roleSwitch,
  student: require('./student'),
  instructor: require('./instructor'),
};
