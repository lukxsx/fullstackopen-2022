import { useState } from 'react'
import loginService from "../services/login";
import blogService from '../services/blogs'

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
            console.log(user)
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log(exception)
            alert('Invalid username or password')
            setUsername('')
            setPassword('')
        }
    }

    return (
        <>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginForm
