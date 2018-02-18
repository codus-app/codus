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
app.get('/category/:name', async (req, res) => {
  const category = await database.getCategory(req.params.name, true);
  if (!category) res.status(404).json({ error: `Category ${req.params.name} was not found` });
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
app.get('/userinfo', auth0(), (req, res) => {
  auth0.getUser(req.user.sub)
    .then(u => res.json(u));
});

// Get a user-specific overview of a category including the category's name/description, the names
// of all contained problems, and whether the user's solution to each passes
app.get('/categoryOverview/:category', auth0(), async (req, res) => {
  const user = await database.getUser(req.user.sub);
  const category = await database.getCategory(req.params.category, true);
  if (!category) res.status(404).json({ error: `Category ${req.params.name} was not found` });
  else {
    const solutions = await category.getSolutions(user);
    const out = category.toObject();
    out.solutions = solutions;
    res.json(out);
  }
});

// Get a user's solution to a problem
app.get('/solution/:category/:problemName', auth0(), async (req, res) => {
  const user = await database.getUser(req.user.sub);
  const solution = await user.getSolution(req.params.category, req.params.problemName);
  if (!solution) res.status(404).json({ error: `no solution by the authenticated user for problem ${req.params.problemName} was found` });
  else res.json(solution);
});

// Add/change a user's solution to a problem
app.put('/solution/:category/:problemName', auth0(), async (req, res) => {
  const user = await database.getUser(req.user.sub);
  const solutionExists = !!(await user.getSolution(req.params.category, req.params.problemName));
  if (solutionExists) { // Update existing
    await user.changeSolution(req.params.category, req.params.problemName, req.body);
    res.status(200).json({ success: true });
  } else { // Create new
    await user.addSolution(req.params.category, req.params.problemName, req.body);
    res.status(201).json({ success: true });
  }
});

// Check a user's solution to a problem
app.get('/check/:category/:problemName', auth0(), async (req, res) => {
  const user = await database.getUser(req.user.sub);
  const solution = await user.getSolution(req.params.category, req.params.problemName);
  if (!solution) res.status(404).json({ error: `no solution by the authenticated user for problem ${req.params.problemName} was found` });
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
