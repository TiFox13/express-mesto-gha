const UserSchema = require('../models/user');

function getUsers(req, res) {
  return UserSchema.find({})
    .then(users => res.status(200).send(users))
    .catch((err) => {
      res.status(500).send({ message: `На сервере произошла ошибка: ${err}` });
    })
};

function getUser(req, res) {
  UserSchema.findById(req.body._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с указанным _id не найден: ${err}` });
        return;
      }
    })
    .then(user => res.status(200).send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные при обновлении профиля: ${err}` });
        return;
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    })
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  UserSchema.create({name, about, avatar})
    .then((user) => res.status(200).send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные при создании пользователя: ${err}` });
        return;
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка:: ${err}` });
      }
    });
};

function patchUserInfo(req, res) {
  UserSchema.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about
    },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с указанным _id не найден: ${err}` });
        return;
      }
    })
    .then(user => res.send(req.body))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные при обновлении профиля: ${err}` });
        return;
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    })
}

function pathAvatar(req, res) {
  UserSchema.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с указанным _id не найден: ${err}` });
        return;
      }
    })
    .then(user => res.send(req.body))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные при обновлении аватара: ${err}` });
        return;
      } else {
        res.status(500).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    })
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  patchUserInfo,
  pathAvatar,
}