const UserSchema = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validationErrorCode, сastErrorCode, generalErrorCode } = require('../utils/errorCodes');

// ВХОД \/
function login(req, res, next) {

  const { email, password } = req.body;
  // ищем пользователя
  UserSchema.findOne({ email }).select('+password')
  .orFail(() => res.status(404).send({ message: 'Пользователь не найден' }))
  // нашли. теперь сравним пароли
  .then((user) => bcrypt.compare(password, user.password).then((matched) => {
    if (matched) {
      return user;
    }
      return res.status(404).send({ message: 'Пользователь не найден' });
  }))
  // все сошлось, теперь выдаем пользователю токен
  .then((user) => {
    console.log(user)
    const token = jwt.sign({ _id : user._id }, 'super-strong-secret', { expiresIn:'7d' });
    res.send({
      email: user.email,
      password: user.password,
      token: token });
  })
  .catch(next);
}

// ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
function getUsers(req, res) {
  return UserSchema.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(generalErrorCode).send({ message: 'На сервере произошла ошибка' });
    });
}

// ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ID
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

function getCurrentUser(req, res, next) {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    // проверяем, есть ли пользователь с таким id
    if (!user) {
      res.status(validationErrorCode).send({ message: 'Пользователь не найден' });
    }
    // возвращаем пользователя, если он есть
    return res.status(200).send(user);
  })
  .catch(next);
};

// СОЗДАНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ\/
function createUser(req, res, next) {
  const {email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10)
  .then((hash) =>
    UserSchema.create({ email, password: hash, name, about, avatar }))
  .then((user) => res.send({message: 'Регистрация прошла успешно!'}))
  .catch((err) => {
    if (err.code === 11000) {
     res.status(409).send({ message: 'Пользователь с такими данными уже существует'})
    } else {
      next(err);
    }
  })
}



// ИЗМЕНЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ
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

//ИЗМЕНЕНИЕ АВАТАРА
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
  login,
  getCurrentUser,
};
