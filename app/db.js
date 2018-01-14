// Contains logic for connecting to the database

const mongoose = require('mongoose');

mongoose.Promise = Promise;
// Construct URI for connection

const username = 'admin';
const password = process.env.CODUS_DB_PASS;
const replicas = [
  'codus-shard-00-00-ezq3k.mongodb.net',
  'codus-shard-00-01-ezq3k.mongodb.net',
  'codus-shard-00-02-ezq3k.mongodb.net',
];
const port = 27017;
const dbName = 'codus';
const replicaSet = 'Codus-shard-0';

const uri = `mongodb://${username}:${password}@${replicas.map(u => `${u}:${port}`).join(',')}/${dbName}`;

// Connect

mongoose.connect(uri, {
  replicaSet,
  ssl: true,
  authSource: 'admin',
  useMongoClient: true,
});
const db = mongoose.connection;


// Requiring this module will yield the 'mongoose.connection' object
module.exports = db;


// This promise will be resolved once the database is connected and allows use of the syntax
// 'await db.ready' in functions that depend on database connection. Simple and clear.
module.exports.ready = new Promise((resolve, reject) => {
  // Reject if we can't connect
  db.on('error', reject);
  // Otherwise resolve
  console.time('Database connected in');
  db.once('open', () => {
    console.timeEnd('Database connected in');
    resolve();
  });
});
