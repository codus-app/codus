const keystone = require('keystone');

const { Types } = keystone.Field;

const Solution = new keystone.List('Solution');

Solution.add({
  /* eslint-disable object-curly-newline */
  user: { type: Types.Relationship, ref: 'User', initial: true, required: true },
  problem: { type: Types.Relationship, ref: 'Problem', initial: true, required: true },
  code: { type: Types.Code, language: 'java', initial: true, required: true },
});

Solution.register();

Solution.defaultColumns = 'user, problem, code';
