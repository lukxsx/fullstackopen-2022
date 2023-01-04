const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1
  })
  response.json(blogs)
})

blogRouter.post("/", async (request, response) => {
  const blogUser = await User.findOne({})
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: blogUser._id
  })

  const savedBlog = await blog.save()

  blogUser.blogs = blogUser.blogs.concat(savedBlog._id)
  await blogUser.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (blogToDelete) {
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
