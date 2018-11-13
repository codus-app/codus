/* eslint-disable global-require */

const keystone = require('keystone');
const { getUser: getAuth0User } = require('../auth');
const { publicizeProblem } = require('./util');

const Category = keystone.list('Category');
const Problem = keystone.list('Problem');
const Solution = keystone.list('Solution');

module.exports = {
  base(req, res) { res.json({ status: 'ok' }); },

  category: {
    async list(req, res) {
      const [categories, problems] = await Promise.all([
        Category.model
          .find()
          .sort({ sortOrder: 1 })
          .select('-__v -sortOrder'),
        Problem.model
          .find()
          .sort({ sortOrder: 1 })
          .select('-_id -__v'),
      ]);
      const cats = categories.map(c => Object.assign(c.toObject(), {
        problems: problems
          .filter(p => p.category.toString() === c._id.toString()) // problems matching category
          .map(({ name }) => ({ name })), // Include just the name in the output object
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
          .where('category').equals(category._id)
          .sort({ sortOrder: 1 }))
          .map(({ name }) => ({ name })); // Include just the name in the output object

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
          res.json(publicizeProblem(problem, problem.category));
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
        userId: undefined,
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
        .select('-_id -__v')
        // When there's no existing user solution, code should be null
        || { toObject: () => ({ code: null, passed: false }) };

      res.json({
        ...solution.toObject(),
        userId: undefined,
        problem: publicizeProblem(problem, problemCategory),
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
      // If there's a previous solution saved and the code didn't change between saves, we can
      // savfely keep the old "passed" state without checking. New solutions are never passing
      // because they've never been checked.
      let passed = false;
      if (solution) { // previous solution exists
        const { code: oldCode, passed: previouslyPassed } = solution;
        const codeChanged = code !== oldCode;
        passed = codeChanged ? false : previouslyPassed;
      }

      let created = false;

      await new Promise((resolve, reject) => {
        if (solution) {
          // Update an existing solution.
          Solution.updateItem(solution, { code, passed }, (error) => {
            if (error) reject(error);
            else resolve();
          });
        } else {
          // Add a new solution
          const newSolution = new Solution.model(); // eslint-disable-line new-cap
          Solution.updateItem(newSolution, {
            problem, userId: req.user.sub, code, passed: false,
          }, (error) => {
            if (error) reject(error);
            else resolve();
          });
          created = true;
        }
      }).catch(err => res.status(400).json(err));

      res.status(created ? 201 : 200).json({ success: true, code, passed });
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

      try {
        // Check solution
        const results = await solution.check();
        // Return results
        res.json({
          passed: results.passed,
          tests: results.tests.map(t => ({
            ...t,
            ...(t.hidden ? { expected: undefined, value: undefined } : {}),
          })),
          error: null,
          solution: {
            code: solution.code,
            problem: publicizeProblem(problem),
          },
        });
      } catch (e) {
        // If check failed (due to error) return that error
        res.json({
          passed: false,
          tests: problem.testCases2
            .map(tc => (!tc.hidden
              ? { value: null, expected: tc.result, pass: false, hidden: false } // eslint-disable-line object-curly-newline, max-len
              : { pass: false, hidden: true })),
          error: e.message,
          solution: {
            code: solution.code,
            problem: publicizeProblem(problem),
          },
        });
      }
    },
  },
};
