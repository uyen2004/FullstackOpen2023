const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
  const token = request.token

  if (!token) {
    request.user = null
    return next()
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      request.user = null
      return next()
    }
    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
  } catch (error) {
    console.error('Error:', error)
    request.user = null;
    next()
  }
}

module.exports = userExtractor
