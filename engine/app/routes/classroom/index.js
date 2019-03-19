const keystone = require('keystone');

const User = keystone.list('User');

function enforceRole(role) {
  return async (req, res, next) => {
    req.user2 = await User.model
      .findOne()
      .where('userId').equals(req.user.sub);

    if (req.user2.role !== role) res.status(403).json({ error: `Authenticated user must have role: ${role}` });
    else next();
  };
}


/* eslint-disable global-require */
module.exports = {
  enforceRole,
  student: require('./student'),
  instructor: require('./instructor'),
};
