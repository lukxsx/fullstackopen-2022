const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if (!(username && name && password)) {
        return response.status(400).send({
            error: 'username, password and name are required'
        })
    }

    // Verify username length
    if (username.length < 3) {
        return response.status(400).json({
            error: 'username must be over 3 characters long'
        })
    }
    // Verify password length (username verified in mongo)
    if (password.length < 3) {
        return response.status(400).json({
            error: 'password must be over 3 characters long'
        })
    }

    // Check if user exists in the db already
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: `username ${username} is already taken`
        })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = new User({
        username,
        name,
        hash,
    })

    const newUser = await user.save()
    response.status(201).json(newUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
        id: 1
    })
    response.json(users)
})

module.exports = usersRouter