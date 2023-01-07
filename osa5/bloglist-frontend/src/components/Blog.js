import { useState } from 'react'


const Blog = ({ blog, addLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {' '}
      <button onClick={() => setShowAll(!showAll)}>{showAll ? 'hide' : 'show'}</button>
      {showAll && (
        <div>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={() => addLike(blog)}>Like!</button></p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  )
}

export default Blog