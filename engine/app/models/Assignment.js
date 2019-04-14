const keystone = require('keystone');

const { Types } = keystone.Field;

const Assignment = new keystone.List('Assignment');

Assignment.add({
  name: { type: Types.Text, initial: true, required: true },
  description: { type: Types.Textarea, initial: true },
  dueDate: { type: Types.Datetime, initial: true },
  problems: { type: Types.Relationship, ref: 'Problem', many: true, initial: true, required: true },
  classroom: { type: Types.Relationship, ref: 'Classroom', initial: true, required: true },
});

Assignment.schema.virtual('numProblems').get(function countProblems() { return this.problems.length; });

Assignment.register();

Assignment.defaultColumns = 'name, classroom, due';
