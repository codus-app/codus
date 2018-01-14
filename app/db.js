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


// Throw error if we can't connect
db.on('error', e => console.log('connection error:', e));
// Otherwise go ahead
db.once('open', () => {
  // User model
  const userSchema = new mongoose.Schema({
    auth0_id: String,
  });
  const User = mongoose.model('User', userSchema);

  User.find()
    .catch(console.error)
    .then(console.log);
});
