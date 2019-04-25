const keystone = require('keystone');

const { Types } = keystone.Field;

const Assignment = new keystone.List('Assignment');

Assignment.add({
  name: { type: Types.Text, initial: true, required: true },
  description: { type: Types.Textarea, initial: true },
  dueDate: { type: Types.Datetime, initial: true },
  problems: { type: Types.Relationship, ref: 'Problem', many: true, initial: true, required: true },
  classroom: { type: Types.Relationship, ref: 'Classroom', initial: true, required: true },
  sortOrder: { type: Types.Number, initial: true },
});

Assignment.schema.virtual('code').get(function shortCode() { return this._id.toString().substring(0, 8); });

Assignment.schema.virtual('numProblems').get(function countProblems() { return this.problems.length; });

Assignment.schema.virtual('createdAt').get(function creationTime() {
  return new Date(parseInt(this.code, 16) * 1000);
});

// For assignments with no sort order set, automatically set to 1 more than the max sort order
// within the same classroom
Assignment.schema.pre('save', async function setSortOrder(next) {
  if (!this.sortOrder) {
    const lastAssignment = await Assignment.model
      .findOne()
      .where('classroom').equals(this.classroom)
      .sort('-sortOrder');
    const maxIndex = (lastAssignment || { sortOrder: -1 }).sortOrder;
    this.sortOrder = maxIndex + 1;
  }
  next();
});

Assignment.register();

Assignment.defaultColumns = 'name, classroom, dueDate';
Assignment.defaultSort = 'sortOrder';
