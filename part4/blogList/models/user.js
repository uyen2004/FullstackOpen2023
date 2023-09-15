const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
})

userSchema.methods.toJSON = function () {
  const user = this.toObject()
  user._id = user._id
  delete user.__v
  delete user.passwordHash
  return user
}

const User = mongoose.model('User', userSchema)
module.exports = User
