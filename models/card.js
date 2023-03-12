const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    reguired: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    reguired: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    reguired: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
