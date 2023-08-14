const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true
    },
    username: String,
    password: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
