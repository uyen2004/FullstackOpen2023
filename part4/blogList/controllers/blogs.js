const express = require('express')
const router = express.Router()
require('dotenv').config()
const Blog = require('../models/blog')
const mongoose = require('mongoose')

router.use(express.json())
router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

router.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'Missing tittle or URL' })
  }
  const user = await User.findById(body.userId)
  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes === undefined ? 0 : likes, 
    user: user._id
  })

  newBlog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => {
      response.status(500).json({ error: 'Internal Server Error' })
    })
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  })


    router.delete('/:id', async (req, res) => {
      const id = req.params.id
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' })
      }
    
      try {
        const removedBlog= await Blog.findByIdAndRemove(id)
        if (!removedBlog) {
          return res.status(404).json({ error: 'Blog not found' })
        }
        res.status(204).end()
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    })

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { likes } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid ID' })
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { likes: likes } },
      { new: true } 
    )

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    res.json(updatedBlog)
  } catch (error) {
    console.error('Error updating blog:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


module.exports = router