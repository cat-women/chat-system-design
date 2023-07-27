const mongoose = require('mongoose')

const messageModel = mongoose.Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: 'User'
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: 'User'
    },
    message: {
      text: {
        type: String,
        default: ''
      },
      image: {
        type: String,
        default: ''
      }
    },
    seen: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const Message = mongoose.model('Message', messageModel)

module.exports = Message
