const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post("/", async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  })

  const savedBlog = await blog.save()
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

module.exports = blogRouter