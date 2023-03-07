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
    type: mongoose.Schema.Types.ObjectId, //ссылка на модель автора карточки, тип ObjectId, обязательное поле;
    reguired: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,    //список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
    default: {},
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('card', cardSchema);