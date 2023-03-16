const jwt = require('jsonwebtoken');
const {Unauthorized} = require('../Errors/Errors');

const auth = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Требуется авторизация'))
  }

  const token = authorization.replace('Bearer ', '')

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new Unauthorized('Требуется авторизация'))
  }
req.user = payload;
  next(); // пропускаем запрос дальше
};

module.exports = auth;