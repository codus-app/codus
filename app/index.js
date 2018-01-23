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
  data.getUser(req.user.sub).then(u => res.json(u));
});


// Run server
const args = process.argv.slice(2);
const port = args.length ? args[0] : 3000;
console.log(`Now listening at 0.0.0.0:${port}`);
app.listen(port, '0.0.0.0');
