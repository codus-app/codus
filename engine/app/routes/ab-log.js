const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base('appfI1KzEs4gdfG8G');

module.exports = function log(req, res) {
  const data = JSON.parse(req.body);
  console.log(data);

  data.problemTimes = data.problemTimes.filter(pt => pt !== null);
  data.meanProblemTimes = data.problemTimes.length
    ? data.problemTimes.reduce((a, b) => a + b) / data.problemTimes.length
    : undefined;

  base('Data').create({
    'User ID': data.userId,
    'Problems solved': data.problemsSolved,
    'Average problem completion time (s)': data.meanProblemTimes,
    'Modal?': data.gamification,
  });

  res.send('ok');
};
