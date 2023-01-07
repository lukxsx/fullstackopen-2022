import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const NewBlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [warning, setWarning] = useState(false)

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.addBlog({ title: title, author: author, url: url })
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotifMessage(`A new blog ${newBlog.title} added!`)
      setTimeout(() => { setNotifMessage(null) }, 5000)
    } catch (exception) {
      setWarning(true)
      setNotifMessage('Error adding blog')
      setTimeout(() => { setNotifMessage(null); setWarning(false) }, 5000)
    }
  }

  return (
      <>
        <h3>Add blog</h3>
        <Notification warning={warning} message={notifMessage} />
        <form onSubmit={addBlog}>
          <div>
            <label>Title: </label>
            <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <label>Author: </label>
            <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <label>Url: </label>
            <input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Add blog</button>
        </form>
      </>
  )
}

export default NewBlogForm
