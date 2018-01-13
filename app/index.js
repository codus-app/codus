const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('success');
});


const args = process.argv.slice(2);
const port = args.length ? args[0] : 3000;
console.log(`Now listening at 0.0.0.0:${port}`);
app.listen(port, '0.0.0.0');
