/* eslint-disable global-require */

const keystone = require('keystone');

const Category = keystone.list('Category');
const Problem = keystone.list('Problem');

module.exports = {
  base(req, res) { res.json({ status: 'ok' }); },

  category: {
    async list(req, res) {
      Category.model
        .find()
        .select('-_id -__v')
        .then(cats => res.json(cats));
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
};
