const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')


const agent = request(app)
describe('Blog list tests', () => {
    test('GET /api/blogs test', async () => {
      const response = await agent
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      expect(response.body.length).toBe(6)
    })
  })
  afterAll(async () => {
    await mongoose.connection.close()
  })