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
      if (!category) res.status(404).json({ error: `Category '${req.params.name}' was not found` });

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
      if (!category) res.status(404).json({ error: `Category '${req.params.category}' was not found` });

      // Find problem with right category and right name
      else {
        const problem = await Problem.model
          .findOne()
          .where('category').equals(category._id)
          .where('name').equals(req.params.name)
          .populate('category')
          .select('-_id -__v');

        if (!problem) res.status(404).json({ error: `Problem '${req.params.name}' was not found` });
        else {
          res.json({
            ...problem.toObject(),
            // Replace testCases and parameters with richer forms from virtuals
            testCases: problem.testCases2,
            parameters: problem.parameters2,
            // Remove _id and __v from category
            category: {
              ...problem.category.toObject(),
              _id: undefined,
              __v: undefined,
            },
          });
        }
      }
    },
  },


  user: {
    async get(req, res) {
      const userInfo = await getAuth0User(req.user.sub);
      res.send(userInfo);
    },
  },

  userSolution: {
    async list(req, res) {
      const solutions = await Solution.model
        .find()
        .where('userId').equals(req.user.sub)
        .select('-_id -__v')
        .populate({ path: 'problem', populate: { path: 'category' } });

      const stripped = solutions.map(s => ({
        ...s.toObject(),
        problem: { category: s.problem.category.name, name: s.problem.name },
      }));

      res.json(stripped);
    },

    async get(req, res) {
      const problemCategory = await Category.model
        .findOne()
        .where('name').equals(req.params.category);
      if (!problemCategory) { res.status(404).json({ error: `Category '${req.params.category}' was not found` }); return; }

      const problem = await Problem.model
        .findOne()
        .where('category').equals(problemCategory._id)
        .where('name').equals(req.params.problem);
      if (!problem) { res.status(404).json({ error: `Problem '${req.params.category}/${req.params.problem}' was not found` }); return; }

      const solution = await Solution.model
        .findOne()
        .where('userId').equals(req.user.sub)
        .where('problem').equals(problem._id)
        .select('-_id -__v');
      if (!solution) { res.status(404).json({ error: `No solution to problem '${req.params.category}/${req.params.problem}' was found for authenticated user ${req.user.sub}` }); return; }

      res.json({
        ...solution.toObject(),
        problem: {
          ...problem.toObject(),
          category: {
            ...problemCategory.toObject(),
            _id: undefined,
            __v: undefined,
          },
          parameters: problem.parameters2,
          testCases: problem.testCases2,
          _id: undefined,
          __v: undefined,
        },
      });
    },

    async put(req, res) {
      const problemCategory = await Category.model
        .findOne()
        .where('name').equals(req.params.category);
      if (!problemCategory) { res.status(404).json({ error: `Category '${req.params.category}' was not found` }); return; }

      const problem = await Problem.model
        .findOne()
        .where('category').equals(problemCategory._id)
        .where('name').equals(req.params.problem);
      if (!problem) { res.status(404).json({ error: `Problem '${req.params.category}/${req.params.problem}' was not found` }); return; }

      const solution = await Solution.model
        .findOne()
        .where('userId').equals(req.user.sub)
        .where('problem').equals(problem._id);

      const { code = '' } = req.body;

      let created = false;

      await new Promise((resolve, reject) => {
        if (solution) {
          // Update an existing solution
          Solution.updateItem(solution, { code, passed: undefined }, (error) => {
            if (error) reject(error);
            else resolve();
          });
        } else {
          // Add a new solution
          const newSolution = new Solution.model(); // eslint-disable-line new-cap
          Solution.updateItem(newSolution, {
            problem, userId: req.user.sub, code,
          }, (error) => {
            if (error) reject(error);
            else resolve();
          });
          created = true;
        }
      }).catch(err => res.status(400).json(err));

      res.status(created ? 201 : 200).json({ success: true });
    },

    async check(req, res) {
      const problemCategory = await Category.model
        .findOne()
        .where('name').equals(req.params.category);
      if (!problemCategory) { res.status(404).json({ error: `Category '${req.params.category}' was not found` }); return; }

      const problem = await Problem.model
        .findOne()
        .where('category').equals(problemCategory._id)
        .where('name').equals(req.params.problem);
      if (!problem) { res.status(404).json({ error: `Problem '${req.params.category}/${req.params.problem}' was not found` }); return; }

      const solution = await Solution.model
        .findOne()
        .where('userId').equals(req.user.sub)
        .where('problem').equals(problem._id);
      if (!solution) { res.status(404).json({ error: `No solution to problem '${req.params.category}/${req.params.problem}' was found for authenticated user ${req.user.sub}` }); return; }

      res.json({
        ...(await solution.check()),

        solution: {
          code: solution.code,
          problem: {
            ...problem.toObject(),
            parameters: problem.parameters2,
            testCases: problem.testCases2,
            _id: undefined,
            __v: undefined,
          },
        },
      });
    },
  },
};
