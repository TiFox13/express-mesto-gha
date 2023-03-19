const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/user');
const {
  ValidationError,
  CastError,
  Unauthorized,
  Conflict,
  InternalServerError,
} = require('../Errors/Errors');

// ВХОД \/
function login(req, res, next) {
  const { email, password } = req.body;
  // ищем пользователя
  UserSchema.findOne({ email }).select('+password')
    .orFail(() => next(new Unauthorized('Требуется авторизация')))
  // нашли. теперь сравним пароли
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (matched) {
          return user;
        }
        return next(new CastError('Пользователь не найден'));
      }))
  // все сошлось, теперь выдаем пользователю токен
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({
        email: user.email,
        password: user.password,
        token,
      });
    })
    .catch(() => next(new InternalServerError()));
}

// ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
function getUsers(req, res, next) {
  return UserSchema.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => next(new InternalServerError()));
}

// ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ID
function getUserById(req, res, next) {
  UserSchema.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new ValidationError('Пользователь с указанным _id не найден'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные _id пользователя'));
      } else {
        next(new InternalServerError());
      }
    });
}

// ПОЛУЧЕНИЕ ИНФЫ О ПОЛЬЗОВАТЕЛЕ
function getUser(req, res, next) {
  const { _id } = req.user;
  UserSchema.findById(_id).then((user) => {
    // проверяем, есть ли пользователь с таким id
    if (!user) {
      next(new ValidationError('Пользователь  не найден'));
      return;
    }
    // возвращаем пользователя, если он есть
    res.send(user);
  })
    .catch(() => next(new InternalServerError()));
}

// СОЗДАНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ\/
function createUser(req, res, next) {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => UserSchema.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с такими данными уже существует'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные для создания пользователя'));
      } else {
        next(err);
      }
    });
}

// ИЗМЕНЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ
function patchUserInfo(req, res, next) {
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
        next(new ValidationError('Пользователь с указанным _id не найден'));
      }
    })
    .then(() => res.send(req.body))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(new InternalServerError());
      }
    });
}

// ИЗМЕНЕНИЕ АВАТАРА
function pathAvatar(req, res, next) {
  UserSchema.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new ValidationError('Пользователь с указанным _id не найден'));
      }
    })
    .then(() => res.send(req.body))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(new InternalServerError());
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
  getUserById,
};
