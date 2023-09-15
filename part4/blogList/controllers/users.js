const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const router = express.Router()

router.post('/', async (req, res) => {
  const { username, password, name } = req.body

  if (!username || !password || !name) {
    return res.status(400).json({ error: 'Missing username, password, or name' })
  }
  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({ error: 'Username and password must be at least 3 characters long' });
  }
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ error: 'Username must be unique' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    passwordHash,
    name,
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
  res.json(users)
})


module.exports = router
