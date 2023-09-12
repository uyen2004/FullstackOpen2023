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
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
module.exports = router