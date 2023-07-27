const { ObjectId } = require('mongodb')
const { verifyAccessToken, verifyRefreshToken } = require('../services/token')

const authUser = async (req, res, next) => {
  const access_token = req.headers['authorization']?.replace('Bearer ', '')
  const { decoded, error } = verifyAccessToken(access_token)

  if (error) {
    next(error)
  }
  req.user = decoded

  next()
}

module.exports = { authUser }
