const keystone = require('keystone');

const { Types } = keystone.Field;

const Category = new keystone.List('Category');

Category.add({
  name: { type: Types.Text, initial: true, required: true },
  displayName: { type: Types.Text, initial: true, required: true },
  description: { type: Types.Text, initial: true, required: true },
});

Category.register();

Category.defaultColumns = 'name, displayName, description';
