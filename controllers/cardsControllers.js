const CardSchema = require('../models/card');

const validationErrorCode = 404;
const сastErrorCode = 400;
const generalErrorCode = 500;

function getCards(req, res) {
  return CardSchema.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(generalErrorCode).send({ message: 'На сервере произошла ошибка' });
    });
}

function createCard(req, res) {
  CardSchema.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id, // ID пользователя. доступный благодаря мидлвэру в app.js
  })
    .then((card) => {
      if (name === undefined || link === undefined || owner === undefined) {
        res.status(validationErrorCode).send({ message: 'Переданы некорректные данные при создании карточки' });
        return
      }
      res.send(card)
    })
    .catch((err) => {
        res.status(generalErrorCode).send({ message: 'На сервере произошла ошибка' });
    });
}

function deleteCard(req, res) {
  CardSchema.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(validationErrorCode).send({ message: 'Карточка с указанным _id не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(сastErrorCode).send({ message: 'Переданы некорректные данные _id пользователя' });
      } else {
        res.status(generalErrorCode).send({ message: 'На сервере произошла ошибка' });
      }
    });
}

function putLike(req, res) {
  CardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(validationErrorCode).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(сastErrorCode).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(generalErrorCode).send({ message: 'На сервере произошла ошибка' });
      }
    });
}

function deleteLike(req, res) {
  CardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(validationErrorCode).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(сastErrorCode).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(generalErrorCode).send({ message: 'На сервере произошла ошибка' });
      }
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
