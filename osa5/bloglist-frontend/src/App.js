import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('userData', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('Invalid username or password')
      setUsername('')
      setPassword('')
    }
  }

  return (
      <>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <button type="submit">login</button>
          </div>
        </form>
      </>
  )
}

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
      <h2>Blogs</h2>
      <div>
        {!user.name || user.name === '' ? user.username : user.name} logged in. {' '}
        <button onClick={() => { window.localStorage.clear(); setUser(null) }}>Logout</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
