const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUser, getUsers, createUser, patchUserInfo, pathAvatar, login, getUserById,
} = require('../controllers/usersControllers');

router.post('/signin', login);

router.post('/signup', createUser);

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getUserById);

router.get('/users/:userId', auth, getUser);

router.patch('/users/me', auth, patchUserInfo);

router.patch('/users/me/avatar', auth, pathAvatar);

module.exports = router;
