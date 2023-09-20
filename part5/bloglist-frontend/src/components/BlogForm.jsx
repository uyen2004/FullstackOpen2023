import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const [noti, setNoti] = useState({ message: null, isError: false })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handleSubmit function in BlogForm.js is called')
    try {
      const createdBlog = await blogService.create(newBlog)
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
      setNoti({
        message: `A new blog '${createdBlog.title}' by '${createdBlog.author}' is added`,
        isError: false,
      })
      setTimeout(() => {
        setNoti({ message: null, isError: false })
      }, 5000)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      console.error('Error creating blog:', error)
      setNoti({ message: 'Error in adding new blog', isError: true })
      setTimeout(() => {
        setNoti({ message: null, isError: false })
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      {noti.message && (
        <div className={noti.isError ? 'error' : 'success'}>
          {noti.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
