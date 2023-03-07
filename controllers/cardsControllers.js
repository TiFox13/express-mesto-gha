const CardSchema = require('../models/card');


//РАБОТАЕТ
function getCards(req, res) {
  return CardSchema.find({})
   .then(cards => res.status(200).send(cards))
   .catch((err) => res.status(500).send({message: "что-то пошло не так"}))
}

//РАБОТАЕТ
function createCard(req, res) {
  CardSchema.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,  //ID пользователя. доступный благодаря мидлвэру в app.js
  })
.then(card => res.status(200).send(req.body))
.catch(() => res.status(400).send({message: "переданы некорректные данные"}))
}

//ЗАРАБОТАЛО!
function deleteCard(req, res) {
  //res.status(200).send(req.body)
 CardSchema.findByIdAndRemove(req.body._id)
 .then(card => {res.send(card)})
 .catch(() => res.status(404).send({message: "карточка не найдена"}))
}

//работает ( но лайк ставит хоть и один, но запрос идет со статусом 200, даже если пользователь уже есть в массиве)
function putLike(req, res){
CardSchema.findByIdAndUpdate(
  req.body._id,
  {$addToSet: {likes: req.user._id}}, // добавить _id в массив, если его там нет
  {new: true},
)
.then(card => res.send(card))
.catch(() => res.status(404).send({message: "карточка не найдена"}))
}

//работает (но запрос проходит с статусом 200 даже если лайк уже снят)
function deleteLike(req, res) {
  CardSchema.findByIdAndUpdate(
    req.body._id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
  .then(card => res.send(card))
  .catch(() => res.status(404).send({message: "карточка не найдена"}))
}



module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
}