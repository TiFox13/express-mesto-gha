const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cardsControllers');
const { ValidationError } = require('../Errors/ValidationError');
const { idValidator } = require('../utils/validator');

router.get('/cards', auth, getCards);

router.post(
  '/cards',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required()
        .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/),
    }),
  }),
  auth,
  createCard,
);

router.delete(
  '/cards/:cardId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: idValidator,
    }),
  }),
  auth,
  deleteCard,
);

router.put(
  '/cards/:cardId/likes',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: idValidator,
    }),
  }),
  auth,
  putLike,
);

router.delete(
  '/cards/:cardId/likes',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: idValidator,
    }),
  }),
  auth,
  deleteLike,
);

router.use('*', auth, (req, res, next) => {
  next(new ValidationError('Страницы по данному адресу не существует'));
});

module.exports = router;
