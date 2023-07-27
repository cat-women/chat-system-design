const express = require('express')
const { accessChat } = require('../controllers/chatController')
const { authUser } = require('../middleware/auth')

const router = express.Router()
router.post('/', authUser, accessChat)

// router.get('/', authUser, fetchChat)
// router.get('/group', authUser, createGroupChat)
// router.put('/rename', authUser, renameGroup)
// router.put('/removeUser', authUser, removeFromGroup)
// router.put('/addUser', authUser, addToGroup)

module.exports = router
