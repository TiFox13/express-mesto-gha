const router = require('express').Router();
// const auth = require('../middlewares/auth');
// const {
//   celebrate, Joi, errors, Segments,
// } = require('celebrate');
const {
  getUser, getUsers, createUser, patchUserInfo, pathAvatar, login, getUserById,
} = require('../controllers/usersControllers');

router.post('/signin', login);

router.post('/signup', createUser);
// celebrate({
//   [Segments.BODY]: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//     name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
//     about: Joi.string().min(2).max(30).default('Исследователь'),
//     avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
//   }),
//   [Segments.QUERY]: {
//     token: Joi.string().token().required()
//   }
// }),

router.get('/users', getUsers); // надо проверить. выйдет ли тогда пройти тест
//  [+] [GET] Добавленному пользователю без необязательных полей, присвоены стандартные значения

router.get('/users/me', getUserById);

router.get('/users/:userId', getUser);

router.patch('/users/me', patchUserInfo);

router.patch('/users/me/avatar', pathAvatar);

module.exports = router;
