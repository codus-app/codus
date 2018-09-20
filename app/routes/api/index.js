/* eslint-disable global-require */

const keystone = require('keystone');
const { getUser: getAuth0User } = require('../auth');

const Category = keystone.list('Category');
const Problem = keystone.list('Problem');
const Solution = keystone.list('Solution');

module.exports = {
  base(req, res) { res.json({ status: 'ok' }); },

  category: {
    async list(req, res) {
      const [categories, problems] = await Promise.all([
        Category.model.find().select('-__v'),
        Problem.model.find().select('-_id -__v'),
      ]);
      const cats = categories.map(c => Object.assign(c.toObject(), {
        problems: problems.filter(p => p.category.toString() === c._id.toString()).map(p => p.name),
        _id: undefined,
      }));
      res.json(cats);
    },

    async get(req, res) {
      const category = await Category.model
        .findOne()
        .where('name').equals(req.params.name)
        .select('-__v');
      if (!category) res.status(404).json({ error: `Category ${req.params.name} was not found` });

      else {
        const problems = (await Problem.model
          .find()
          .where('category').equals(category._id))
          .map(prob => prob.name);

        res.json(Object.assign(category.toObject(), { problems, _id: undefined }));
      }
    },
  },


  problem: {
    async get(req, res) {
      // Find category document which we will use for locating associated problems
      const category = await Category.model
        .findOne()
        .where('name').equals(req.params.category);
      if (!category) res.status(404).json({ error: `Category ${req.params.category} was not found` });

      // Find problem with right category and right name
      else {
        const problem = await Problem.model
          .findOne()
          .where('category').equals(category._id)
          .where('name').equals(req.params.name)
          .populate('category')
          .select('-_id -__v');

        if (!problem) res.status(404).json({ error: `Problem ${req.params.name} was not found` });
        else res.json(problem);
      }
    },
  },


  user: {
    async get(req, res) {
      const userInfo = await getAuth0User(req.user.sub);
      res.send(userInfo);
    },

    async getSolutions(req, res) {
      const solutions = await Solution.model
        .find()
        .where('userId').equals(req.user.sub)
        .select('-_id -__v')
        .populate('problem');

      const stripped = solutions.map(s => ({
        ...s.toObject(),
        problem: {
          ...s.problem.toObject(),
          _id: undefined,
          __v: undefined,
        },
      }));

      res.json(stripped);
    },
  },
};
