/* eslint-disable global-require */

const keystone = require('keystone');
const { md } = require('./util');
const { publicizeProblem } = require('./util/problem');
const HTTPError = require('./util/error');

const Category = keystone.list('Category');
const Problem = keystone.list('Problem');
const User = keystone.list('User');
const Solution = keystone.list('Solution');


// Routes for retrieving public information about categories


module.exports.categories = {
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
      description: md(c.description),
      problems: problems
        .filter(p => p.category.toString() === c._id.toString()) // problems matching category
        .map(({ name }) => ({ name })), // Include just the name in the output object
      _id: undefined,
    }));
    res.json({ data: cats });
  },

  async get(req, res) {
    const category = await Category.model
      .findOne()
      .where('name').equals(req.params.name)
      .select('-__v -sortOrder');
    if (!category) return new HTTPError(404, `Category '${req.params.name}' was not found`).handle(res);

    const problems = (await Problem.model
      .find()
      .where('category').equals(category._id)
      .sort({ sortOrder: 1 }))
      .map(({ name }) => ({ name })); // Include just the name in the output object

    return res.json({
      data: Object.assign(category.toObject(), {
        problems,
        description: md(category.description),
        _id: undefined,
      }),
    });
  },
};


// Routes for retrieving public information about problems


module.exports.problems = {
  async get(req, res) {
    // Find category document which we will use for locating associated problems
    const category = await Category.model
      .findOne()
      .where('name').equals(req.params.category);
    if (!category) return new HTTPError(404, `Category '${req.params.category}' was not found`).handle(res);

    // Find problem with right category and right name
    const problem = await Problem.model
      .findOne()
      .where('category').equals(category._id)
      .where('name').equals(req.params.name)
      .populate('category')
      .select('-_id -__v');

    if (!problem) return new HTTPError(404, `Problem '${req.params.name}' was not found`).handle(res);
    return res.json({ data: publicizeProblem(problem, problem.category) });
  },
};


// Routes for retrieving and manipulating users' solutions to problems


module.exports.userSolutions = {
  async list(req, res) {
    const user = await User.model
      .findOne()
      .where('userId').equals(req.user.sub);

    const solutions = await Solution.model
      .find()
      .where('user').equals(user._id)
      .select('-_id -__v')
      .populate({ path: 'problem', populate: { path: 'category' } });

    const stripped = solutions
      .filter(s => s.problem) // Filter out solutions to deleted probelms
      .map(s => ({
        ...s.toObject(),
        user: undefined,
        userId: undefined,
        problem: { category: s.problem.category.name, name: s.problem.name },
      }));

    res.json({ data: stripped });
  },

  async get(req, res) {
    const problemCategory = await Category.model
      .findOne()
      .where('name').equals(req.params.category);
    if (!problemCategory) return new HTTPError(404, `Category '${req.params.category}' was not found`).handle(res);

    const problem = await Problem.model
      .findOne()
      .where('category').equals(problemCategory._id)
      .where('name').equals(req.params.problem);
    if (!problem) return new HTTPError(404, `Problem '${req.params.category}/${req.params.problem}' was not found`).handle(res);

    const user = await User.model
      .findOne()
      .where('userId').equals(req.user.sub);

    const solution = (await Solution.model
      .findOne()
      .where('user').equals(user._id)
      .where('problem').equals(problem._id)
      .select('-_id -__v'))
      // When there's no existing user solution, code should be null
      || { toObject: () => ({ code: null, passed: false }) };

    return res.json({
      data: {
        ...solution.toObject(),
        user: undefined,
        userId: undefined,
        problem: publicizeProblem(problem, problemCategory),
      },
    });
  },

  async put(req, res) {
    const { code = '' } = req.body;
    if (code.length > 10000) return new HTTPError(413, 'Code must not be more than 10kb in size').handle(res);

    const problemCategory = await Category.model
      .findOne()
      .where('name').equals(req.params.category);
    if (!problemCategory) return new HTTPError(404, `Category '${req.params.category}' was not found`).handle(res);

    const problem = await Problem.model
      .findOne()
      .where('category').equals(problemCategory._id)
      .where('name').equals(req.params.problem);
    if (!problem) return new HTTPError(404, `Problem '${req.params.category}/${req.params.problem}' was not found`).handle(res);

    const user = await User.model
      .findOne()
      .where('userId').equals(req.user.sub);

    const solution = await Solution.model
      .findOne()
      .where('user').equals(user._id)
      .where('problem').equals(problem._id);

    // If there's a previous solution saved and the code didn't change between saves, we can
    // savfely keep the old "passed" state without checking. New solutions are never passing
    // because they've never been checked.
    let passed = false; // TODO: 'unknown'
    if (solution) { // previous solution exists
      const { code: oldCode, passed: previouslyPassed } = solution;
      if (code === oldCode) passed = previouslyPassed;
    }

    if (solution) {
      // Update an existing solution.
      Solution.updateItem(solution, { code, passed }, (error) => {
        if (error) new HTTPError('Something went wrong').handle(res);
        else res.json({ data: { code, passed } });
      });
    } else {
      // Add a new solution
      const newSolution = new Solution.model(); // eslint-disable-line new-cap
      Solution.updateItem(newSolution, {
        problem, user: user._id, code, passed: false, // TODO: 'unknown'
      }, (error) => {
        if (error) new HTTPError('Something went wrong').handle(res);
        else res.status(201).json({ data: { code, passed } });
      });
    }

    return undefined;
  },

  async check(req, res) {
    const problemCategory = await Category.model
      .findOne()
      .where('name').equals(req.params.category);
    if (!problemCategory) return new HTTPError(404, `Category '${req.params.category}' was not found`).handle(res);

    const problem = await Problem.model
      .findOne()
      .where('category').equals(problemCategory._id)
      .where('name').equals(req.params.problem);
    if (!problem) return new HTTPError(404, `Problem '${req.params.category}/${req.params.problem}' was not found`).handle(res);

    const user = await User.model
      .findOne()
      .where('userId').equals(req.user.sub);

    const solution = await Solution.model
      .findOne()
      .where('user').equals(user._id)
      .where('problem').equals(problem._id);
    if (!solution) return new HTTPError(404, `No solution to problem '${req.params.category}/${req.params.problem}' was found for authenticated user ${req.user.sub}`).handle(res);


    // NOTE: this code duplicated in instructor.js for checking student solutions!

    let error;
    let results;
    let testCases;

    try {
      results = await solution.check();

      testCases = results.tests
        .map(t => (t.hidden
          ? { ...t, expected: undefined, value: undefined }
          : t));
      error = null;
    } catch (e) {
      // Check failed (due to error)
      results = undefined;
      testCases = problem.testCases2
        .map(tc => (!tc.hidden
          ? { pass: false, hidden: true }
          : { value: null, expected: tc.result, pass: false, hidden: false }));
      error = e.message;
    }

    return res.json({
      data: {
        passed: error ? false : results.passed,
        tests: testCases,
        error,
        solution: { code: solution.code, problem: publicizeProblem(problem) },
      },
    });
  },
};
