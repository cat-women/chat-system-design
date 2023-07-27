let mongoose = require('mongoose')

const userModal = mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userModal)
module.exports = User
