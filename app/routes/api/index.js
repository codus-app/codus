/* eslint-disable global-require */

const keystone = require('keystone');

const Category = keystone.list('Category');
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
        .select('-_id -__v');
      if (!category) res.status(404).json({ error: `Category ${req.params.name} was not found` });
      else {
        res.json(category.toObject());
      }
    },
  },
};
