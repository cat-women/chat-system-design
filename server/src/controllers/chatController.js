const Chat = require('../models/chat')
const User = require('../models/user')

const accessChat = async (req, res, next) => {
  const { userId } = req.body
  if (!userId) return res.status(400).json({ msg: 'UserId not given' })

  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      users: { $all: [req.user.id, userId] }
    })
      .populate('users', '-password')
      .populate('latestMessage')

    isChat = await User.populate(isChat, {
      path: 'latestMessage.senderId',
      select: 'username email'
    })
    if (isChat.length) return res.status(200).json({ chat: isChat[0] })

    const createdChat = await Chat.create({
      chatName: 'Sender',
      isGroupChat: false,
      users: [req.user.id, userId]
    })

    const fullChat = await Chat.findById(createdChat._id).populate(
      'users',
      '-password'
    )
    return res.status(200).json({ chat: fullChat })
  } catch (error) {
    console.log(error)
    next()
  }
}

const fetchChat = async (req, res, next) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })
      .then(result => {
        res.status(200).json(result)
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" })
  }
}

const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({ msg: 'Provide all fiedls' })
  }
  const users = req.body.users

  if (users.length < 2) {
    return res.status(400).json({ msg: 'We need more than 3 users' })
  }
  users.push(req.user.id)

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user.id
    })

    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate('users', '-password')
      .populate('groupAdmin', '-password')

    return res.status(200).json(fullGroupChat)
  } catch (error) {
    console.log(error)
    next()
  }
}

const renameGroup = async (req, res, next) => {
  const { chatId, groupName } = req.body
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password')

    if (!updatedChat) res.status(404).json({ msg: 'Chat not found' })
    return res.status(200).json(updatedChat)
  } catch (error) {
    console.log(error)
    next()

  }
}
const addToGroup = async (req, res, next) => {
  const { chatId, userId } = req.body
  try {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password')

    if (!removed) res.status(404).json({ msg: 'Chat not found' })
    return res.status(200).json(removed)
  } catch (error) {
    console.log(error)
    next()

  }
}

const removeFromGroup = async (req, res, next) => {
  const { chatId, userId } = req.body
  try {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password')

    if (!removed) res.status(404).json({ msg: 'Chat not found' })
    return res.status(200).json(removed)
  } catch (error) {
    console.log(error)
    next()

  }
}
module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup
}
