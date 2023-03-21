const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUser,
  getUsers,
  createUser,
  patchUserInfo,
  pathAvatar,
  login,
  getUserById,
} = require('../controllers/usersControllers');
const { ValidationError } = require('../Errors/ValidationError');
const { idValidator } = require('../utils/validator');

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
      about: Joi.string().min(2).max(30).default('Исследователь'),
      avatar: Joi.string()
        .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
        .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/),
    }),
  }),
  createUser,
);

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getUser);

router.get(
  '/users/:userId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: idValidator,
    }),
  }),
  auth,
  getUserById,
);

router.patch(
  '/users/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  auth,
  patchUserInfo,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string()
        .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/),
    }),
  }),
  auth,
  pathAvatar,
);

router.use('*', auth, (req, res, next) => {
  next(new ValidationError('Страницы по данному адресу не существует'));
});

module.exports = router;
