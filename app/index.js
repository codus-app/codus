const express = require('express');
const cors = require('cors');

// Authentication
const auth0 = require('./auth');
// Database stuff
const data = require('./data');
// Helper methods
const { stripId } = require('./helpers');


const app = express();
app.use(cors());
app.set('json spaces', 2);


app.get('/', (req, res) => {
  res.send('success');
});


// Return the user info encoded in the Authorization header
app.get('/userinfo', auth0(), (req, res) => {
  res.json(req.user);
});

// Query the database for the authenticated user and return all info
app.get('/user', auth0(), (req, res) => {
  data.getUser.byAuth0(req.user.sub)
    .then(stripId) // Remove _id key
    .then(u => res.json(u));
});

// Get a user's solution to a problem
app.get('/solution/:problemName', auth0(), async (req, res) => {
  const user = await data.getUser.byAuth0(req.user.sub);
  const solution = await user.getSolution(req.params.problemName);
  if (!solution) res.status(404).json({ error: `no solution by the authenticated user for problem ${req.params.problemName} was found` });
  else res.json(stripId(solution));
});


// Query the database for a problem
app.get(['/problem', '/problems'], (req, res) => {
  // By name
  if (req.query.name) {
    data.getProblem.byName(req.query.name)
      .then(stripId) // Remove _id key
      .then(prob => res.json(prob));
    return;
  }
  // By category
  if (req.query.cat) req.query.category = req.query.cat; // cat works as an abbreviation of catgeory
  if (req.query.category) {
    data.getProblem.byCategory(req.query.category)
      .then(stripId) // Remove _id keys
      .then(probs => res.json(probs));
    return;
  }
  // Fail if neither name nor cat|category was passed
  res.status(400).json({ error: '"name" or "category" parameter is required' });
});


// Run server
const args = process.argv.slice(2);
const port = args.length ? args[0] : 3000;
console.log(`Now listening at 0.0.0.0:${port}`);
app.listen(port, '0.0.0.0');
