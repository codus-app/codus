const keystone = require('keystone');

const Classroom = keystone.list('Classroom');

module.exports.generateInviteCode = async function generateInviteCode(length = 6) {
  const charset = 'abcdefghjklmnpqrstvwxyz123456789';

  const buildRandomString = len => new Array(len).fill(null)
    .map(() => charset[Math.floor(Math.random() * charset.length)])
    .join('');

  const code = buildRandomString(length);

  const existingClass = await Classroom.model
    .findOne()
    .where('code').equals(code);

  if (existingClass) return generateInviteCode(); // Prevent collisions
  return code;
};
