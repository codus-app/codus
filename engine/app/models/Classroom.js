const keystone = require('keystone');

const { Types } = keystone.Field;

const Classroom = new keystone.List('Classroom');

Classroom.add({
  name: { type: Types.Text, initial: true, required: true },
  instructor: {
    type: Types.Relationship,
    ref: 'User',
    initial: true,
    required: true,
    filters: { role: 'instructor' },
  },
});

Classroom.relationship({
  path: 'students',
  ref: 'User',
  refPath: 'classroom',
});

Classroom.register();
