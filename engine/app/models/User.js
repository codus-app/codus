const keystone = require('keystone');

const { getUser } = require('../auth');

const { Types } = keystone.Field;

const User = new keystone.List('User');

User.add({
  // Links user to Auth0
  userId: { type: Types.Text, note: 'From auth0', initial: true, required: true, index: true },
  role: { type: Types.Select, options: 'student, instructor', initial: true, required: true },
  classroom: {
    type: Types.Relationship,
    ref: 'Classroom',
    initial: true,
    required: false,
    dependsOn: { role: 'student' },
  },
});

// Show classrooms for which this user is the instructor
User.relationship({
  path: 'classrooms',
  ref: 'Classroom',
  refPath: 'instructor',
});

// Show solutions whose user is set to this one
User.relationship({
  path: 'solutions',
  ref: 'Solution',
  refPath: 'user',
});

User.schema.methods.fetch = async function fetchAuth0User() {
  return getUser.byId(this.id);
};

User.register();

User.defaultColumns = 'role|10%, classroom|20%, userId|50%';
