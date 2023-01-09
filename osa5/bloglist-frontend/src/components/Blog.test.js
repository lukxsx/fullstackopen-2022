import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http://google.com',
    likes: 22
  }

  const user = {
    username: 'testuser',
    name: 'Tester'
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} addLike={mockHandler} deleteBlog={mockHandler} user={user} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Test title')
  expect(div).toHaveTextContent('Test author')
  expect(div).not.toHaveTextContent('http://google.com')
  expect(div).not.toHaveTextContent('22')
})