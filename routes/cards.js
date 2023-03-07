const router = require('express').Router();
const {getCards, createCard, deleteCard} = require('../controllers/cardsControllers')

router.get('/cards', getCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

module.exports = router;