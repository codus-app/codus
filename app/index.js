const express = require('express');
const cors = require('cors');
const auth0 = require('./auth');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('success');
});

app.get('/userinfo', auth0(), (req, res) => {
  res.send(JSON.stringify(req.user));
});

const args = process.argv.slice(2);
const port = args.length ? args[0] : 3000;
console.log(`Now listening at 0.0.0.0:${port}`);
app.listen(port, '0.0.0.0');
