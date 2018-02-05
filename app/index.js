const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();
// Authentication
const auth0 = require('./auth');
// Database stuff
const data = require('./data');
// Helper methods
const { stripId } = require('./helpers');


const app = express();
app.use(cors());
app.use(bodyParser.text());
app.set('json spaces', 2);


app.get('/', (req, res) => {
  res.send('success');
});


// Query the database for a problem
app.get('/problem/:name', async (req, res) => {
  // By name
  const problem = await data.getProblem.byName(req.params.name);
  if (!problem) res.status(404).json({ error: `Problem ${req.params.name} was not found` });
  else res.json(stripId(problem));
});

// Get all the problems in a category
app.get('/category/:name', async (req, res) => {
  const problems = await data.getProblems.byCategory(req.params.name);
  if (!problems.length) res.status(404).json({ error: `No problems match category ${req.params.name}` });
  else res.json(stripId(problems));
});


// Query the database for the authenticated user and return all info
app.get('/user', auth0(), (req, res) => {
  data.getUser.byAuth0(req.user.sub)
    .then(stripId) // Remove _id key
    .then(u => res.json(u));
});

// Get all of the information auth0 stores on the authenticated user
app.get('/userinfo', auth0(), (req, res) => {
  auth0.getUser(req.user.sub)
    .then(u => res.json(u));
});

// Get a user's solution to a problem
app.get('/solution/:problemName', auth0(), async (req, res) => {
  const user = await data.getUser.byAuth0(req.user.sub);
  const solution = await user.getSolution(req.params.problemName);
  if (!solution) res.status(404).json({ error: `no solution by the authenticated user for problem ${req.params.problemName} was found` });
  else res.json(stripId(solution));
});

// Check a user's solution to a problem
app.get('/check/:problemName', auth0(), async (req, res) => {
  const user = await data.getUser.byAuth0(req.user.sub);
  const solution = await user.getSolution(req.params.problemName);
  if (!solution) res.status(404).json({ error: `no solution by the authenticated user for problem ${req.params.problemName} was found` });
  else {
    const results = await solution.check();
    res.json(results);
  }
});


// Run server
const args = process.argv.slice(2);
const port = args.length ? args[0] : 3000;
console.log(`Now listening at 0.0.0.0:${port}`);
app.listen(port, '0.0.0.0');
