const keystone = require('keystone');

const User = keystone.list('User');

module.exports.checkInstructor = async (req, res, next) => {
  req.user2 = await User.model
    .findOne()
    .where('userId').equals(req.user.sub);

  if (req.user2.role !== 'instructor') res.status(403).json({ error: 'Authenticated user must have role: instructor' });
  else next();
};
