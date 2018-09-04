const keystone = require('keystone');

const AdminUser = new keystone.List('AdminUser');

AdminUser.add({
  email: { type: keystone.Field.Types.Email, unique: true },
  password: { type: keystone.Field.Types.Password },
});
AdminUser.schema.virtual('canAccessKeystone').get(() => true);
AdminUser.defaultColumns = 'id, email';

AdminUser.register();
