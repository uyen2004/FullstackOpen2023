const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
})

userSchema.methods.toJSON = function () {
  const user = this.toObject()
  user._id
  delete user.__v
  delete user.passwordHash
  return user
}

userSchema.pre('save', async function (next) {
  if (this.isModified('passwordHash')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10)
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
