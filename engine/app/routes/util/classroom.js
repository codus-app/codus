const keystone = require('keystone');
const HTTPError = require('./error');

const Classroom = keystone.list('Classroom');
const Assignment = keystone.list('Assignment');

const { ObjectID } = keystone.mongoose.mongo;


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


/**
 * Fetch an assignment using an assignment code and a classroom object.
 */
module.exports.fetchAssignment = async function fetchAssignment(
  code, classroom, shouldPopulate = false,
) {
  if (code.length !== 8) throw new HTTPError(400, 'Assignment code must be an 8-character code');
  if (/[^0-9a-f]/i.test(code)) throw new HTTPError(400, 'Assignment code must be hexadecimal');

  const assignmentPromise = Assignment.model
    .findOne()
    .where('classroom').equals(classroom._id)
    .where('_id')
      .gte(new ObjectID(`${code}0000000000000000`)) // eslint-disable-line indent
      .lte(new ObjectID(`${code}ffffffffffffffff`)) // eslint-disable-line indent
    .select('-__v');

  // Populate if shouldPopulate was passed as true
  if (shouldPopulate) assignmentPromise.populate({ path: 'problems', populate: { path: 'category' } });

  const assignment = await assignmentPromise;

  if (!assignment) throw new HTTPError(404, `Assignment '${code}' was not found in classroom ${classroom.code}`);

  return assignment;
};
