const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const blog=require('../models/blog')


const agent = request(app)
describe('Blog list tests', () => {
  test('GET /api/blogs test', async () => {
    const response = await agent
      .get('/api/blogs')
      .expect(200)
    
    const blogsInDatabase = await Blog.find({})
    expect(response.body.length).toBe(blogsInDatabase.length)
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

  /*describe('Blog list tests', () => {
    let blogsLength
  
    beforeAll(async () => {
      const blogs = await Blog.find({})
      blogsLength = blogs.length
    })
  
    test('POST /api/blogs test', async () => {
      const newBlog = {
        title: 'A little white lie',
        author: 'Uyn',
        url: 'https://epiphany.com',
        likes: 10
      }
  
      const response = await agent
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
  
      expect(response.body).toHaveProperty('id')
      expect(response.body.title).toBe(newBlog.title)
  
      const blogs = await Blog.find({})
      
      expect(blogs).toHaveLength(blogsLength + 1)
  
      const savedBlog = blogs.find(blog => blog.id === response.body.id)
      expect(savedBlog.likes).toBe(10)
    })

    test('POST /api/blogs missing "title"', async () => {
      const newBlog = {
        author: 'Uyn',
        url: 'https://epiphany.com',
        likes: 10,
      };
  
      const response = await agent
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
    
    test('POST /api/blogs missing "url"', async () => {
      const newBlog = {
        title: 'A little white lie',
        author: 'Uyn',
        likes: 10,
      }
    
      await agent
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })*/
  
  
  /*describe('Blog list tests', () => {
    let blogsLength
    beforeAll(async () => {
      const blogs = await Blog.find({})
      blogsLength = blogs.length
    })
  
    test('POST /api/blogs with missing "likes"', async () => {
      const newBlog= {
        title: 'A little white lie',
        author: 'Uyn',
        url: 'https://epiphany.com',
      }
  
      const response = await agent
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
  
      expect(response.body).toHaveProperty('likes', 0)
      const blogs = await Blog.find({})
      expect(blogs).toHaveLength(blogsLength + 1)
  
      const savedBlog = blogs.find(blog => blog.id === response.body.id)
      expect(savedBlog.likes).toBe(0)
    })
  })*/

  describe('Blog list tests', () => {  
    test('DELETE /api/blogs/:id deletes a single blog post', async () => {
      const newBlog = {
        title: 'A little white lie',
        author: 'Uyn',
        url: 'https://epiphany.com',
        likes: 10
      }
    
      const createResponse = await agent
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
      const createdBlogId = createResponse.body.id
    
      const deleteResponse = await agent
        .delete(`/api/blogs/${createdBlogId}`)
        .expect(204)
    
      const deletedBlog = await Blog.findById(createdBlogId)
      expect(deletedBlog).toBeNull()
    })
    
  })

  describe('Blog list tests', () => {
    let createdBlog
  
    beforeAll(async () => {
      const newBlog = new Blog({
        title: 'tittle',
        author: 'Author',
        url: 'https://blog.com',
        likes: 5,
      })
  
      createdBlog = await newBlog.save()
    })
  
    afterAll(async () => {
      await Blog.findByIdAndRemove(createdBlog._id)
      await mongoose.connection.close();
    })
  
    test('PUT /api/blogs/:id updates', async () => {
      const updatedLikes = 10
  
      const response = await agent
        .put(`/api/blogs/${createdBlog._id}`)
        .send({ likes: updatedLikes })
        .expect(200)
  
      expect(response.body.likes).toBe(updatedLikes)
  
      const updatedBlog = await Blog.findById(createdBlog._id)
      expect(updatedBlog.likes).toBe(updatedLikes);
    })
  
    test('PUT /api/blogs/:id returns 404 for invalid ID', async () => {
      const Id  = '9319ksaj911'
  
      const response = await agent
        .put(`/api/blogs/${Id}`)
        .send({ likes: 10 })
        .expect(404)
  
      expect(response.status).toBe(404)
    })
  })

 
    describe('Adding a New Blog', () => {
      beforeAll(async () => {
        const user = new User({
          username: 'uyen',
          passwordHash: await bcrypt.hash('uyen1234', 10),
          name: 'uyen'
      })
      test('should add a new blog with a valid token', async () => {
        const newBlog = {
          title: 'Test Blog',
          author: 'Test Author',
          url: 'https://example.com/test',
          likes: 10,
        };
    
        const response = await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${token}`) 
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/);
    
        expect(response.body.title).toBe(newBlog.title);
        expect(response.body.author).toBe(newBlog.author);
        expect(response.body.url).toBe(newBlog.url);
        expect(response.body.likes).toBe(newBlog.likes);
      });
    
      test('should fail to add a new blog without a token', async () => {
        const newBlog = {
          title: 'Test Blog',
          author: 'Test Author',
          url: 'https://example.com/test',
          likes: 10,
        };
    
        const response = await api
          .post('/api/blogs')
          .send(newBlog) 
          .expect(401)
      })
    })
  afterAll(async () => {
    await mongoose.connection.close()
  })
})
