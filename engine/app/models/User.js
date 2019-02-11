const keystone = require('keystone');

const { getUser } = require('../auth');

const { Types } = keystone.Field;

const User = new keystone.List('User');

User.add({
  /* eslint-disable object-curly-newline */
  // Links user to Auth0
  userId: { type: Types.Text, note: 'From auth0', initial: true, required: true, index: true },
  /* eslint-enable */
});

User.schema.methods.fetch = async function fetchAuth0User() {
  return getUser.byId(this.id);
};

User.register();

User.defaultColumns = 'userId';
