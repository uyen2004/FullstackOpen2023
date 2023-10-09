const config = require('./utils/config')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const userRouter = require('./controllers/users')
const bodyParser = require('body-parser')
const loginRouter=require('./controllers/login')
const tokenExtractor = require('./middleware/tokenExtractor')
const userExtractor = require('./middleware/userExtractor')
const cors = require('cors')
const allowedOrigins = ['http://localhost:5173']

app.use(cors({
  origin: allowedOrigins,
}))

app.use(userExtractor)
app.use(tokenExtractor)
app.use(bodyParser.json())
app.use(express.json())

mongoose.connect(config.mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })


app.use('/api/blogs',userExtractor, blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(express.static('build'))
app.use(express.json())

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

module.exports = app