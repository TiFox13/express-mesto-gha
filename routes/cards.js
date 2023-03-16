const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cardsControllers');

router.get('/cards', auth, getCards);

router.post('/cards', auth, createCard);

router.delete('/cards/:cardId', auth, deleteCard);

router.put('/cards/:cardId/likes', auth, putLike);

router.delete('/cards/:cardId/likes', auth, deleteLike);

module.exports = router;
