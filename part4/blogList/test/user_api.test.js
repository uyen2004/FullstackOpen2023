const request = require('supertest')
const app = require('../app')
const User = require('../models/user')

const agent = request(app)

describe('User API tests', () => {
  test('POST /api/users with invalid username and password', async () => {
    const response = await agent
      .post('/api/users')
      .send({ username: 'me', password: 'me', name:'meme' })
      .expect(400)

    expect(response.body.error).toBe(
      'Username and password must be at least 3 characters long'
    )
  })

  test('POST /api/users with existed username', async () => {
    const user = new User({
      username: 'Annie',
      password: 'go123',
      name: 'Annie Dao',
    })
    await user.save();

    const response = await agent
      .post('/api/users')
      .send({ username: 'Annie',
      password: 'go123',
      name: 'Annie Dao' })
      .expect(400);

    expect(response.body.error).toBe('Username must be unique');
  })

  test('POST /api/users with valid data', async () => {
    const response = await agent
      .post('/api/users')
      .send({ username: 'quinn', password: 'quinn123', name: 'Quinn Smith' })
      .expect(201)

    expect(response.body.username).toBe('quinn')
  })
})
