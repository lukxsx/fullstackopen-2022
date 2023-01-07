import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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


  if (user === null) return <LoginForm setUser={setUser} />

  return (
    <div>
      <h1>Bloglist app</h1>
      <div>
        {!user.name || user.name === '' ? user.username : user.name} logged in. {' '}
        <button onClick={() => { window.localStorage.clear(); setUser(null) }}>Logout</button>
      </div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <NewBlogForm blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

export default App
