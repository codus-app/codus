const keystone = require('keystone');

const { getUser } = require('../auth');

const { Types } = keystone.Field;

const User = new keystone.List('User');

User.add({
  // Links user to Auth0
  userId: { type: Types.Text, note: 'From auth0', initial: true, required: true, index: true },
  role: { type: Types.Select, options: 'student, instructor', initial: true, required: true },
});

User.relationship({
  path: 'solutions',
  ref: 'Solution',
  refPath: 'user',
});

User.schema.methods.fetch = async function fetchAuth0User() {
  return getUser.byId(this.id);
};

User.register();

User.defaultColumns = 'role, userId';
