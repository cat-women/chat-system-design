const Chat = require('../models/chat')
const User = require('../models/user')

const accessChat = async (req, res, next) => {
  const { userId } = req.body

  if (!userId) return res.status(400).json({ msg: 'UserId not given' })

  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $req: req.user.id } } },
        { users: { $elemMatch: { $req: userId } } }
      ]
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
    res.status(200).json({ chat: fullChat })
  } catch (error) {
    console.log(error)
    next()
  }
}

module.exports = { accessChat }
