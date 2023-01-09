const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

let authHeader = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const hash = await bcrypt.hash('password', 10)
  const user = new User({ name: 'Tester', username: 'testuser', hash: hash })
  const userBlogs = helper.initialBlogs.map(x => ({...x, user: user._id}))
  await Blog.insertMany(userBlogs)
  user.blogs = userBlogs.map(x => x._id)
  await user.save()

  const response = await api
    .post('/api/login')
    .send({
      username: 'testuser',
      password: 'password'
    })
    .expect(200)
  authHeader = {
    Authorization: `Bearer ${response.body.token}`
  }
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
    url: 'http://testi.com',
    likes: 4
  }

  test('cannot add blog without token', async () => {
    await api.post('/api/blogs')
      .send(newEntry)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog list increases by one when new one is added', async () => {
    await api.post('/api/blogs')
      .set(authHeader)
      .send(newEntry)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('new blog has the right title', async () => {
    await api.post('/api/blogs').set(authHeader).send(newEntry).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body.map(r => r.title)).toContain('test blog post')
  })

  test('likes value will be 0 if no likes are given', async () => {
    const { likes, ...blogWithoutLikes } = newEntry
    const response = await api.post('/api/blogs')
      .set(authHeader)
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0)
  })

  test('return 400 if title is missing', async () => {
    const { title, ...blogWithoutTitle } = newEntry
    const response = await api.post('/api/blogs')
      .set(authHeader)
      .send(blogWithoutTitle).expect(400)
  })

  test('return 400 if url missing', async () => {
    const { url, ...blogWithoutUrl } = newEntry
    const response = await api.post('/api/blogs')
      .set(authHeader)
      .send(blogWithoutUrl).expect(400)
  })

  test('return 400 if both title and url missing', async () => {
    const { title, url, ...blogWithoutFields } = newEntry
    const response = await api.post('/api/blogs').set(authHeader)
      .send(blogWithoutFields).expect(400)
  })
})

describe('deleting blog entries', () => {
  test('return 400 then trying to delete non-existent blog post', async () => {
    const response = await api.delete('/api/blogs/doesnotexist').set(authHeader)
      .expect(400)
  })

  test('blog list length decreases by one when blog is deleted', async () => {
    const blogsBefore = await api.get('/api/blogs')
    const deleteResponse = await api.delete(`/api/blogs/${blogsBefore.body[0].id}`).set(authHeader)
      .expect(204)
    const blogsAfter = await api.get('/api/blogs')
    expect(blogsAfter.body).toHaveLength(blogsBefore.body.length - 1)
  })

  test('after deleting blog, it cannot be found from the bloglist return', async () => {
    const blogsBefore = await api.get('/api/blogs').expect(200)
    const deletion = await api.delete(`/api/blogs/${blogsBefore.body[0].id}`).set(authHeader)
      .expect(204)
    const blogsAfter = await api.get('/api/blogs')
    expect(blogsAfter.body.map(r => r.title)).not.toContain('React patterns')
  })
})

describe('edit blogs', () => {
  test('edit title', async () => {
    const blogsBefore = await api.get('/api/blogs').expect(200)
    const blogToModify = { title: 'edited title' }
    const update = await api.put(`/api/blogs/${blogsBefore.body[0].id}`)
      .set(authHeader)
      .send(blogToModify)
      .expect(200)
    const blogsAfter = await api.get('/api/blogs').expect(200)
    expect(blogsAfter.body.map(r => r.title)).toContain('edited title')
  })

  test('edit author', async () => {
    const blogsBefore = await api.get('/api/blogs').expect(200)
    const blogToModify = { author: 'edited author' }
    const update = await api.put(`/api/blogs/${blogsBefore.body[0].id}`)
      .set(authHeader)
      .send(blogToModify)
      .expect(200)
    const blogsAfter = await api.get('/api/blogs').expect(200)
    expect(blogsAfter.body.map(r => r.author)).toContain('edited author')
  })

  test('edit url', async () => {
    const blogsBefore = await api.get('/api/blogs').expect(200)
    const blogToModify = { url: 'http://google.com' }
    const update = await api.put(`/api/blogs/${blogsBefore.body[0].id}`)
      .set(authHeader)
      .send(blogToModify)
      .expect(200)
    const blogsAfter = await api.get('/api/blogs').expect(200)
    expect(blogsAfter.body.map(r => r.url)).toContain('http://google.com')
  })

  test('edit likes', async () => {
    const blogsBefore = await api.get('/api/blogs').expect(200)
    const blogToModify = { likes: 9000 }
    const update = await api.put(`/api/blogs/${blogsBefore.body[0].id}`)
      .set(authHeader)
      .send(blogToModify)
      .expect(200)
    const blogsAfter = await api.get('/api/blogs').expect(200)
    expect(blogsAfter.body.map(r => r.likes)).toContain(9000)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
