import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Welcome from './components/Welcome'
import BlogForm from './components/BlogForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
 
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      const storedUser = localStorage.getItem('loggedBlogUser')
      console.log(user.token)
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    }
    blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs([...blogs, createdBlog])
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }
  

  const loginForm = () => (
    
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <>
          
          <Welcome user={user} loginForm={loginForm} setUser={setUser} />
          <BlogForm addBlog={addBlog} />
        </>
      )}
    </div>
  )
}

export default App
