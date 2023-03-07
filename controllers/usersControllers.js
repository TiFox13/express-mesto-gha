const UserSchema = require('../models/user');

//РАБОТАЕТ
function getUsers(req, res) {
   return UserSchema.find({})
   .then(users => res.status(200).send(users))
};

//РАБОТАЕТ
function getUser(req, res) {
  UserSchema.findById(req.body._id)
  .then(user => {res.send(user)})
};

//РАБОТАЕТ
function createUser(req, res) {
UserSchema.create({...req.body})
.then(user => res.status(200).send(req.body))

};

module.exports = {
  getUser,
  getUsers,
  createUser,
}