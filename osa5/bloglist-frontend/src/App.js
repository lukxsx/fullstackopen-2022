import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [warning, setWarning] = useState(false)
  const [notifMessage, setNotifMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userData = window.localStorage.getItem('userData')
    if (userData) {
      const user = JSON.parse(userData)
      setUser(user)
    }
  }, [])

    const createBlog = async (blog) => {
      try {
        const newBlog = await blogService.addBlog(blog)
        setBlogs(blogs.concat(newBlog))
        setNotifMessage(`A new blog ${newBlog.title} added!`)
        setTimeout(() => { setNotifMessage(null) }, 5000)
      } catch (exception) {
        setWarning(true)
        setNotifMessage('Error adding blog')
        setTimeout(() => { setNotifMessage(null); setWarning(false) }, 5000)
      }
    }

  const doLogin = async (loginUser) => {
    try {
      const user = await loginService.login(loginUser)
      window.localStorage.setItem('userData', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      setWarning(true)
      setNotifMessage('Invalid username or password')
      setTimeout(() => { setNotifMessage(null); setWarning(false) }, 5000)
    }
  }

  const blogFormRef = useRef()
    const newBlogForm = () => (
        <Togglable buttonLabel='New blog' ref={blogFormRef}>
          <NewBlogForm createBlog={createBlog} />
        </Togglable>
    )


  if (user === null) {
    return (
      <>
        <Notification warning={warning} message={notifMessage} />
        <LoginForm doLogin={doLogin} />
      </>
    )
}

  return (
    <div>
      <h1>Bloglist app</h1>
      <Notification warning={warning} message={notifMessage} />
      {user === null && (<LoginForm setUser={setUser} />)}
      <div>
        {!user.name || user.name === '' ? user.username : user.name} logged in. {' '}
        <button onClick={() => { window.localStorage.clear(); setUser(null) }}>Logout</button>
      </div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {newBlogForm()}
    </div>
  )
}

export default App
