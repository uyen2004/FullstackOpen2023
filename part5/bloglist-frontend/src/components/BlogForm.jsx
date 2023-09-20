import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const [formVisible, setFormVisible] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handleSubmit function in BlogForm.js is called');
    try {
      const createdBlog = await blogService.create(newBlog);
      setNewBlog({
        title: '',
        author: '',
        url: '',
      });
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog])
      setFormVisible(false)
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }

  return (
    <div>
      <button onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Cancel' : 'Create New Blog'}
      </button>
      {formVisible && (
        <div>
          <h2>Create a new blog</h2>
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
      )}
    </div>
  )
}

export default BlogForm
