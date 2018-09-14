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
  },
};
