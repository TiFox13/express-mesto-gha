const UserSchema = require('../models/user');


function errorTyper(res, err){
  if (err.name === 'Bad Request') return res.status(400).send({"message": "Переданы некорректные данные"})
  if (err.name === 'Not Found') return res.status(404).send({"message": "Запрашиваемый пользователь не найден"})
  if (err.name === 'Internal Server Error') return res.status(500).send({"message": "Что-то пошло не так"})
}

//РАБОТАЕТ
function getUsers(req, res) {
   return UserSchema.find({})
   .then(users => res.status(200).send(users))

};

//РАБОТАЕТ
function getUser(req, res) {
  UserSchema.findById(req.body._id)
  .then(user => {res.send(user)})

}
//РАБОТАЕТ
function createUser(req, res) {
UserSchema.create({...req.body})
.then(user => res.status(200).send(req.body))
};

//РАБОТАЕТ
function patchUserInfo(req, res) {
  UserSchema.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about})
  .then(user => res.send(req.body))
 }

//РАБОТАЕТ
function pathAvatar(req, res) {
UserSchema.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar})
.then(user => res.send(req.body))
}


module.exports = {
  getUser,
  getUsers,
  createUser,
  patchUserInfo,
  pathAvatar,
}