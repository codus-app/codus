const util = require('util');
const keystone = require('keystone');
const { md } = require('.');
const HTTPError = require('./error');

const Category = keystone.list('Category');
const Problem = keystone.list('Problem');


module.exports = {
  // Prepare a problem from mongoose to be exposed to the public.
  // Expands useful information, and hides secret information
  publicizeProblem: (problem, category) => ({
    ...problem.toObject(),
    // Fix bug with quotes inside code blocks
    description: md(problem.description),
    // Return richer test cases from virtual attribute. Only report non-hidden test cases
    testCases: problem.testCases2
      .filter(tc => !tc.hidden)
      .map(tc => ({ ...tc, hidden: undefined })),
    // Report only the number of test cases that are hidden, not the test cases themselves
    hiddenTestCases: undefined,
    numHidden: problem.testCases2
      .filter(tc => tc.hidden).length,
    // Return richer parameters from virtual attribuet
    parameters: problem.parameters2,
    // Category if provided
    category: category
      ? {
        ...category.toObject(),
        description: md(category.description),
        _id: undefined,
        __v: undefined,
      }
      : undefined,

    _id: undefined,
    __v: undefined,
  }),

  /** Parse a problem from a string or object and throw an error if unsupported format is passed */
  parseProblem: (problem) => {
    if (typeof problem === 'string') {
      if ((problem.match(/\//g) || []).length !== 1) throw new Error(`Problem string ${util.inspect(problem)} is not formatted as 'category/problemName'`);
      else {
        const [category, problemName] = problem.trim().split('/');
        return { category, problemName };
      }
    } else if (Array.isArray(problem)) {
      if (problem.length !== 2 || problem.some(c => typeof c !== 'string')) throw new Error(`Array '${util.inspect(problem)}' is not formatted as ['category', 'problemName']`);
      else return { category: problem[0], problemName: problem[1] };
    } else if (typeof problem === 'object') {
      const keys = Object.keys(problem);
      if (keys.length !== 2 || !problem.category || !problem.problemName) throw new Error(`Object '${util.inspect(problem)}' is not formatted as { category: '(categoryName)', problemName: '(problemName)' }`);
      else return problem;
    } else {
      throw new Error(`Problem '${util.inspect(problem)}' passed in unsupported format`);
    }
  },

  /** Parse multiple problems from an array and error if an unsupported problem is passed */
  parseProblems: problems => problems.map(p => module.exports.parseProblem(p)),

  /**
   * Parse an array of problems and return the Problem document that corresponds to each, handling
   * errors appropriately
   */
  async fetchProblems(rawProblems) {
    const parsedProblems = module.exports.parseProblems(rawProblems);
    const categoryNames = new Set();
    parsedProblems.forEach(({ category }) => categoryNames.add(category));
    // Fetch all categories
    const categories = await Category.model
      .find()
      .where('name').in([...categoryNames]);
    const fetchedCategoryNames = categories.map(c => c.name);
    // Error if there are missing categories
    const missingCategory = [...categoryNames].find(c => !fetchedCategoryNames.includes(c));
    if (missingCategory) throw new HTTPError(404, `Category '${missingCategory}' was not found`);

    // Fetch all problems
    const problemQueries = parsedProblems.map(({ category, problemName }) => ({
      name: problemName,
      category: categories.find(c => c.name === category)._id,
    }));
    const problems = await Problem.model
      .find()
      .or(problemQueries);
    // Error handling: find first problem that was queried for, but doesn't appear in the fetched
    // set of problems; this problem couldn't be found and an error should be thrown.
    const missingProblemIndex = problemQueries.findIndex(({ name: p, category: c }) => !problems
      .find(({ name: p2, category: c2 }) => p === p2 && c.equals(c2)));
    const missingProblem = parsedProblems[missingProblemIndex];
    if (missingProblem) throw new HTTPError(404, `Problem '${missingProblem.category}/${missingProblem.problemName}' was not found`);

    return { problems, categories };
  },
};
