const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })
  console.log("User name from request: ", username)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
    console.log('Password from Request:', password)
    console.log('User:', user)
  console.log('Password Correct:', passwordCorrect)
  console.log(user.blogs.length > 0)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id.toString(),
    blogs: user.blogs
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  console.log(token)
  response
  .status(200)
  .send({ token, username: user.username, name: user.name, id: user._id.toString(), blogs: user.blogs })
})

module.exports = loginRouter
