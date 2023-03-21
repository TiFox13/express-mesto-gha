const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cardsControllers');
const {
  ValidationError
} = require('../Errors/Errors');
const idValidator = require('../validator/validator')




router.get('/cards', auth, getCards);

router.post('/cards',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    }),
  }),
  auth,
  createCard,
);

router.delete('/cards/:cardId',
celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: idValidator,
  }),
}),
auth,
 deleteCard);

router.put('/cards/:cardId/likes',
celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: idValidator,
  }),
}), auth, putLike);

router.delete('/cards/:cardId/likes',
celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: idValidator,
  }),
}), auth, deleteLike);

router.use('*', auth, (req, res, next) => {
  next(new ValidationError('Страницы по данному адресу не существует'));
});

module.exports = router;
