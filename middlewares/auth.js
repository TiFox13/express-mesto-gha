const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return  res.status(401).send({ "message": "Ошибка авторизации" });
  }

  const token = authorization.replace('Bearer ', '')

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    res.status(401).send({ "message": "Ошибка авторизации" });
  }
req.user = payload;
  next(); // пропускаем запрос дальше
};

module.exports = auth;