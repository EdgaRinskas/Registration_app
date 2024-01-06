const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String },
});

module.exports = mongoose.model('User', userSchema);
