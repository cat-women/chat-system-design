const { ObjectId } = require('mongodb')
const { verifyAccessToken, verifyRefreshToken } = require('../services/token')

const authUser = async (req, res, next) => {
  const access_token = req.headers['authorization']?.replace('Bearer ', '')
  if (!access_token) res.status(404).json({ msg: "Not authenticated" })
  const { decoded, error } = verifyAccessToken(access_token)
  if (error) {
    console.log("jwt error", error);
    return res.status(401).json({ msg: "Authentication failed" })
  }
  req.user = decoded

  next()
}

module.exports = { authUser }
