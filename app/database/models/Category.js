const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  problems: [String],
});

module.exports = mongoose.model('Category', categorySchema);
