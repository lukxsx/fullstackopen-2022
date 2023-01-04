const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

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
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter