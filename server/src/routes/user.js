const express = require('express')
const UserController = require('../controllers/userController')
const { authUser } = require('../middleware/auth')

const user = new UserController()
const router = express.Router()

router.post('/signup', user.signup)
router.post('/signin', user.signin)
router.get('/search', authUser, user.getUsers)

module.exports = router
