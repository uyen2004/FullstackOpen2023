const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')


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
  afterAll(async () => {
    await mongoose.connection.close()
  })