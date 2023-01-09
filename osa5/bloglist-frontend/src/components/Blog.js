import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false)

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author} {' '}
      <button
        id="show-button"
        onClick={() => setShowAll(!showAll)}>
        {showAll ? 'hide' : 'show'}
      </button>
      {showAll && (
        <div>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes} <button
            onClick={() => addLike(blog)}
            id="like-button"
          >Like!</button></p>
          <p>{blog.user.name}</p>
          {(blog.user.username === user.username) && (<button id="delete-button" onClick={() => {
            if (window.confirm(`Are you sure? Removing blog ${blog.title}`)) deleteBlog(blog)
          }}>Delete</button>)}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog