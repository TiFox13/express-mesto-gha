const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cardsControllers');

router.get('/cards', auth, getCards);

router.post(
  '/cards',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    }),
  }),
  createCard,
);

router.delete('/cards/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', putLike);

router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;
