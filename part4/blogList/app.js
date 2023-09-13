const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

mongoose.connect(config.mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })


app.use('/api/blogs', router)
app.use(cors())
app.use(express.static('build'))
app.use(express.json())


module.exports = app