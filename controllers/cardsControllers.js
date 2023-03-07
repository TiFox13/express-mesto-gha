const CardSchema = require('../models/card');


//РАБОТАЕТ
function getCards(req, res) {
  return CardSchema.find({})
   .then(cards => res.status(200).send(cards))
}

//РАБОТАЕТ
function createCard(req, res) {
  CardSchema.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,  //ID пользователя. доступный благодаря мидлвэру в app.js
  })
.then(card => res.status(200).send(req.body))
}

//ЗАРАБОТАЛО!
function deleteCard(req, res) {
  //res.status(200).send(req.body)
 CardSchema.findByIdAndRemove(req.body._id)
 .then(card => {res.send(card)})
}


module.exports = {
  getCards,
  createCard,
  deleteCard,
}