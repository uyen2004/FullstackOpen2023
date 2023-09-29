import  { useState } from 'react';

const BlogForm = ({ addBlog, setBlogs }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const [notication, setNotification] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createdBlog = await addBlog(newBlog);
      if (createdBlog) {
        setNewBlog({
          title: '',
          author: '',
          url: '',
        });
        setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
        console.log("Calling addBlog with argument:", newBlog);
        setNotification(`A new blog '${createdBlog.title}' by '${createdBlog.author}' is added`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      } else {
        console.error('Error creating blog: Response object is undefined or has incorrect structure');
        setNotification('Error creating blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      setNotification('Error creating blog');
    }
  };
  

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <button onClick={toggleFormVisibility}>
        {formVisible ? 'Hide Form' : 'Create New Blog'}
      </button>
      {formVisible && (
        <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="title-input">Title:</label>
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleInputChange}
          id="title-input"
          data-testid="title-input"
        />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={newBlog.author}
            onChange={handleInputChange}
            data-testid="author-input"
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            value={newBlog.url}
            onChange={handleInputChange}
            data-testid="url-input"
          />
        </div>
        <button type="submit">Create</button>
      </form>
      
         
      )}
      
     
    </div>
  );
};

export default BlogForm;
