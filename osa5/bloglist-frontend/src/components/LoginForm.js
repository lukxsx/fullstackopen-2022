import { useState } from 'react'
import loginService from "../services/login";
import blogService from '../services/blogs'
import Notification from './Notification'

const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password
            })
            window.localStorage.setItem('userData', JSON.stringify(user))
            setUser(user)
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Invalid username or password')
            setTimeout(() => { setErrorMessage(null) }, 5000)
        }
    }

    return (
        <>
            <h3>Login</h3>
            <Notification message={errorMessage} warning={true} />
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
