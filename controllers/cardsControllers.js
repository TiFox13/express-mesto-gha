const CardSchema = require('../models/card');

function getCards(req, res) {
  return CardSchema.find({})
    .then(cards => res.status(200).send(cards))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные при создании карточки: ${err}` });
        return;
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка:: ${err}` });
      }
    });
};


function createCard(req, res) {
  CardSchema.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,  //ID пользователя. доступный благодаря мидлвэру в app.js
  })
    .then(card => res.status(200).send(card))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные при создании карточки: ${err}` });
        return;
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка:: ${err}` });
      }
    });
}


function deleteCard(req, res) {

  CardSchema.findByIdAndRemove(req.body._id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Карточка с указанным _id не найдена: ${err}` });
        return;
      }
        res.send({data: card})
    })
    .catch(err => res.status(500).send({ message: `На сервере произошла ошибка: ${err}` }))

  }

function putLike(req, res) {
  CardSchema.findByIdAndUpdate(
    req.body._id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card.likes.includes(req.user._id)) {
        res.status(400).send({ message: `Переданы некорректные данные для постановки/снятии лайка: ${err}` })
        return;
      }
    res.status(200).send(card)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: `Передан несуществующий _id карточки: ${err}` })
        return;
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
}

function deleteLike(req, res) {
  CardSchema.findByIdAndUpdate(
    req.body._id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(400).send({ message: `Переданы некорректные данные для постановки/снятии лайка: ${err}` })
        return;
      }
      res.status(200).send(card)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: `Передан несуществующий _id карточки: ${err}` });
        return;
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });

}



module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
}