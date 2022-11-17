const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('getting blog entries', () => {
  test('blog entries are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('api returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('specific blog is included in the response', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.map(r => r.title)).toContain('TDD harms architecture')
  })

  test('blog entries should be identified by field _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(r => {
      expect(r.id).toBeDefined()
    })
  })
})

describe('adding blog entries', () => {
  const newEntry = {
    title: 'test blog post',
    author: 'mr. testing',
    likes: 4
  }

  test('blog list increases by one when new one is added', async () => {
    await api.post('/api/blogs').send(newEntry).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('new blog has the right title', async () => {
    await api.post('/api/blogs').send(newEntry).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body.map(r => r.title)).toContain('test blog post')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
