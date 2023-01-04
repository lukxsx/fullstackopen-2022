const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const middleware = require('../middleware')

const extractToken = request => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7)
  }
  return null
}

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1
  })
  response.json(blogs)
})

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: request.user._id
  })

  const savedBlog = await blog.save()

  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (blogToDelete) {
    if (blogToDelete.user.toString() !== request.user._id.toString()) {
      return response.status(401).json({ error: 'you don\'t have rights to delete this blog'})
    }
    await Blog.deleteOne(blogToDelete)
  } else {
    response.status(400).end()
  }
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.status(200).json(updated)
})

module.exports = blogRouter
