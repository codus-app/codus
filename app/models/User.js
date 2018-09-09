const keystone = require('keystone');

const { Types } = keystone.Field;

const User = new keystone.List('User', {
  map: { name: 'username' },
});

User.add({
  auth0id: {
    type: Types.Text,
    label: 'Auth0 ID',
    initial: true,
    required: true,
  },
  username: {
    type: Types.Text,
    initial: true,
  },
});

User.register();

User.defaultColumns = 'username, auth0id';
