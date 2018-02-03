const express = require('express');
const cors = require('cors');

// Authentication
const auth0 = require('./auth');
// Database stuff
const data = require('./data');


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
app.get('/user', auth0(), async (req, res) => {
  data.getUser.byAuth0(req.user.sub)
    .then(u => u.toObject())
    .then(u => Object.assign(u, { _id: undefined })) // Remove _id key
    .then(u => res.json(u));
});

// Query the database for a problem
app.get(['/problem', '/problems'], async (req, res) => {
  // By name
  if (req.query.name) {
    data.getProblem.byName(req.query.name)
      .then(prob => prob.toObject())
      .then(prob => Object.assign(prob, { _id: undefined })) // Remove _id key
      .then(prob => res.json(prob));
    return;
  }
  // By category
  if (req.query.cat) req.query.category = req.query.cat; // cat works as an abbreviation of catgeory
  if (req.query.category) {
    data.getProblem.byCategory(req.query.category)
      .then(probs => probs.map(p => p.toObject()))
      .then(probs => probs.map(p => Object.assign(p, { _id: undefined }))) // Remove _id keys
      .then(probs => res.json(probs));
    return;
  }
  // Fail if neither name nor cat|category was passed
  res.status(400).json({ error: 'name or category parameter is required' });
});


// Run server
const args = process.argv.slice(2);
const port = args.length ? args[0] : 3000;
console.log(`Now listening at 0.0.0.0:${port}`);
app.listen(port, '0.0.0.0');
