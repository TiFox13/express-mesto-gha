const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    reguired: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    reguired: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    reguired: true,
  },
});

module.exports = mongoose.model('user', userSchema);
