const express = require('express')
const router = express.Router()
require('dotenv').config()
const Blog = require('../models/blog')

router.use(express.json())
router.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

router.post('/', (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'Missing tittle or URL' })
  }

  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes === undefined ? 0 : likes, 
  })

  newBlog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal Server Error' })
    })
})

module.exports = router