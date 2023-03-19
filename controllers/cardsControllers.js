const CardSchema = require('../models/card');
const {
  ValidationError,
  CastError,
  InternalServerError,
} = require('../Errors/Errors');

// ПОЛУЧЕНИЕ КАРТОЧЕК
function getCards(req, res, next) {
  return CardSchema.find({})
    .then((cards) => res.send(cards))
    .catch(() => next(new InternalServerError()));
}

// СОЗДАНИЕ КАРТОЧКИ
function createCard(req, res, next) {
  CardSchema.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id, // ID пользователя. доступный благодаря мидлвэру в app.js
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные при создании карточки'));
      } else {
        next(new InternalServerError());
      }
    });
}

// УДАЛЕНИЕ КАРТОЧКИ
function deleteCard(req, res, next) {
  CardSchema.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new ValidationError('Карточка с указанным _id не найдена'));
      }
      if (!card.owner === req.user._id) {
        next(new CastError('ЭЙ! НЕ ТЫ ДЕЛАЛ! (тут надо поменять на ошибку другую)'));
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные _id пользователя'));
      } else {
        next(new InternalServerError());
      }
    });
}

// ПОСТАВИТЬ ЛАЙК
function putLike(req, res, next) {
  CardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new ValidationError('Переданы некорректные данные для постановки лайка'));
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Передан несуществующий _id карточки'));
      } else {
        next(new InternalServerError());
      }
    });
}

// УДАЛИТЬ ЛАЙК
function deleteLike(req, res, next) {
  CardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new ValidationError('Переданы некорректные данные для снятия лайка'));
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Передан несуществующий _id карточки'));
      } else {
        next(new InternalServerError());
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
