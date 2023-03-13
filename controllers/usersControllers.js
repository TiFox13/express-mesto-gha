const UserSchema = require('../models/user');
const { validationErrorCode, сastErrorCode, generalErrorCode } = require('../utils/errorCodes');

function getUsers(req, res) {
  return UserSchema.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(generalErrorCode).send({ message: 'На сервере произошла ошибка' });
    });
}

function getUser(req, res) {
  UserSchema.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(validationErrorCode).send({ message: 'Пользователь с указанным _id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(сastErrorCode).send({ message: 'Переданы некорректные данные _id пользователя' });
      } else {
        res.status(generalErrorCode).send({ message: 'На сервере произошла ошибка' });
      }
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  UserSchema.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(сastErrorCode).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else {
        res.status(generalErrorCode).send({ message: 'На сервере произошла ошибка' });
      }
    });
}

function patchUserInfo(req, res) {
  UserSchema.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(validationErrorCode).send({ message: 'Пользователь с указанным _id не найден' });
      }
    })
    .then(() => res.send(req.body))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(сastErrorCode).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else {
        res.status(generalErrorCode).send({ message: 'На сервере произошла ошибка' });
      }
    });
}

function pathAvatar(req, res) {
  UserSchema.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(validationErrorCode).send({ message: 'Пользователь с указанным _id не найден' });
      }
    })
    .then(() => res.send(req.body))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(сastErrorCode).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } else {
        res.status(generalErrorCode).send({ message: 'На сервере произошла ошибка' });
      }
    });
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  patchUserInfo,
  pathAvatar,
};
