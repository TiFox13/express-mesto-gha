const router = require('express').Router();
const {
  getUser, getUsers, createUser, patchUserInfo, pathAvatar, login,
} = require('../controllers/usersControllers');

router.post('/signin', login);

router.post('/signup', createUser);

router.get('/users', getUsers);

router.get('/users/:userId', getUser);

router.patch('/users/me', patchUserInfo);

router.patch('/users/me/avatar', pathAvatar);

module.exports = router;
