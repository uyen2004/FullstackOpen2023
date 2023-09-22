import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'

const Welcome = ({ user, loginForm, setUser}) => {
  const [userBlogs, setUserBlogs] = useState([])

  useEffect(() => {
    if (user) {
      console.log('User:', user.id)
      blogService.getBlogsByUserId(user.id).then((filteredBlogs) => {
        console.log('Filtered Blogs:', filteredBlogs)
        setUserBlogs(filteredBlogs)
      })
    }
  }, [user])

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          {userBlogs.length > 0 ? (
            <ul>
              {userBlogs.map((blog) => (
              <div key={blog.id}>
                <Blog blog={blog} />
              </div>
              ))}
            </ul>
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Welcome
