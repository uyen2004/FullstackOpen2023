const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')


const agent = request(app)
describe('Blog list tests', () => {
    test('GET /api/blogs test', async () => {
      const response = await agent
      .get('/api/blogs')
      .expect(200)
      expect(response.body.length).toBe(6)
    })
  })
  describe('Blog list tests', () => {
    test('verifies the unique identifier ', async () => {
      const response = await agent
        .get('/api/blogs')
        .expect(200)
  
      response.body.forEach((blog) => {
        expect(blog.id).toBeDefined()
        expect(blog._id).toBeUndefined()
      })
    })
  })

  describe('Blog list tests', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
    })
  
    test('POST /api/blogs test', async () => {
      const newBlog = {
        title: 'A little white lie',
        author: 'Uyn',
        url: 'https://epiphany.com',
        likes: 10,
      }
  
      const response = await agent
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
  
      expect(response.body).toHaveProperty('id')
      expect(response.body.title).toBe(newBlog.title)
  
      const blogs = await Blog.find({})
      expect(blogs).toHaveLength(1)
    })
  })
  

  afterAll(async () => {
    await mongoose.connection.close()
  })