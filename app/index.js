const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();
// Authentication
const auth0 = require('./auth');
// Database stuff
const database = require('./database');


const app = express();
app.use(cors());
app.use(bodyParser.text());
app.set('json spaces', 2);


app.get('/', (req, res) => {
  res.send('success');
});


// Query the database for a problem
app.get('/problem/:category/:name', async (req, res) => {
  const problem = await database.getProblem(req.params.category, req.params.name, true);
  if (!problem) res.status(404).json({ error: `Problem ${req.params.name} was not found` });
  else res.json(problem);
});

// Get all the categories
app.get('/categories', async (req, res) => {
  database.getCategories(true)
    .then(cats => res.json(cats));
});

// Get all the problems in a category
app.get('/category/:id', async (req, res) => {
  const category = await database.getCategory(req.params.id, true);
  if (!category) res.status(404).json({ error: `Category ${req.params.id} was not found` });
  else {
    const problems = await category.getProblems(true);
    const out = category.toObject();
    out.problems = problems;
    res.json(out);
  }
});


// Query the database for the authenticated user and return all info
app.get('/user', auth0(), (req, res) => {
  database.getUser(req.user.sub, true)
    .then(u => res.json(u));
});

// Get all of the information auth0 stores on the authenticated user
app.get('/user-info', auth0(), (req, res) => {
  auth0.getUser(req.user.sub)
    .then(u => res.json(u));
});

app.get('/solutions', auth0(), async (req, res) => {
  const user = await database.getUser(req.user.sub);
  const problems = await database.getProblems(true);
  const { solutions } = user;
  const passed = solutions
    .filter(s => s.passed)
    .map(s => ({ category: s.category, name: s.name }));

  const out = {};

  problems.forEach((p) => {
    if (!out[p.category]) out[p.category] = [];
    out[p.category].push({
      name: p.name,
      passed: !!passed.find(n => (n.name === p.name && n.category === p.category)),
    });
  });

  res.json(out);
});

// Get a user-specific overview of a category including the category's name/description, the names
// of all contained problems, and whether the user's solution to each passes
app.get('/category-overview/:id', auth0(), async (req, res) => {
  const user = await database.getUser(req.user.sub);
  const category = await database.getCategory(req.params.id, true);
  if (!category) res.status(404).json({ error: `Category ${req.params.name} was not found` });
  else {
    const solutions = await category.getSolutions(user);
    const out = category.toObject();
    out.solved = solutions
      .filter(s => s.passed)
      .map(s => s.name);
    res.json(out);
  }
});

// Get a user's solution to a problem
app.get('/solution/:category/:problem', auth0(), async (req, res) => {
  const user = await database.getUser(req.user.sub);
  const solution = await user.getSolution(req.params.category, req.params.problem);
  if (!solution) res.status(404).json({ error: `no solution by the authenticated user for problem ${req.params.problemName} was found` });
  else res.json(solution);
});

// Add/change a user's solution to a problem
app.put('/solution/:category/:problem', auth0(), async (req, res) => {
  const user = await database.getUser(req.user.sub);
  const solutionExists = !!(await user.getSolution(req.params.category, req.params.problem));
  if (solutionExists) { // Update existing
    await user.changeSolution(req.params.category, req.params.problem, req.body);
    res.status(200).json({ success: true });
  } else { // Create new
    await user.addSolution(req.params.category, req.params.problem, req.body);
    res.status(201).json({ success: true });
  }
});

// Check a user's solution to a problem
app.get('/check/:category/:problem', auth0(), async (req, res) => {
  const user = await database.getUser(req.user.sub);
  const solution = await user.getSolution(req.params.category, req.params.problem);
  if (!solution) res.status(404).json({ error: `no solution by the authenticated user for problem ${req.params.problem} was found` });
  else {
    const results = await solution.check();
    res.json(results);
  }
});


// Error handling
app.use(require('./errorHandle'));


// Run server
const args = process.argv.slice(2);
const port = args.length ? args[0] : 3000;
console.log(`Now listening at 0.0.0.0:${port}`);
app.listen(port, '0.0.0.0');
