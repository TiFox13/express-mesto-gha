const router = require('express').Router();
const { getUser, getUsers, createUser, patchUserInfo, pathAvatar } = require('../controllers/usersControllers')

router.get('/users', getUsers);

router.get('/users/:userId', getUser);

router.post('/users', createUser);

router.patch('/users/me', patchUserInfo)

router.patch('/users/me/avatar', pathAvatar)

module.exports = router;