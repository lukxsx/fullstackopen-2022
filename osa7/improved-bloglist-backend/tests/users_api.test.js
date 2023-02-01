const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')



describe('user creation', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const hash = await bcrypt.hash('password', 10)
    const user = new User({ name: 'default', username: 'testuser', hash: hash} )
    await user.save()
  })

  test('valid user can be created', async () => {
    const newUser = {
      username: 'test2',
      name: 'Testaaja',
      password: 'password'
    }
    const usersAtStart = await helper.usersInDb()
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creating user with too short username fails', async () => {
    const newUser = {
      username: 'ts',
      name: 'Testaaja',
      password: 'password'
    }
    const usersAtStart = await helper.usersInDb()
    await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('creating user with too short password fails', async () => {
    const newUser = {
      username: 'test3',
      name: 'Testaaja43',
      password: 'aa'
    }
    const usersAtStart = await helper.usersInDb()
    await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('cannot create users with same name', async () => {
    const newUser = {
      username: 'testuser',
      name: 'default',
      password: 'password'
    }
    const usersAtStart = await helper.usersInDb()
    await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
