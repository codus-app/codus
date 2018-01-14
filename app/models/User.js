const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  auth0_id: String,
  // TOOD
});
module.exports = mongoose.model('User', userSchema);
