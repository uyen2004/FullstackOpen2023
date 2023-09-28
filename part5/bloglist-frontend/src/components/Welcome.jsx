import { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';

const Welcome = ({ user, loginForm, setUser }) => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [likes, setLikes] = useState({}); 

  useEffect(() => {
    if (user) {
      console.log('User:', user.id);
      blogService.getBlogsByUserId(user.id).then((filteredBlogs) => {
        filteredBlogs.sort((a, b) => b.likes - a.likes);
        
        setUserBlogs(filteredBlogs);
        const initialLikes = {};
        filteredBlogs.forEach((blog) => {
          initialLikes[blog.id] = blog.likes;
        });
        setLikes(initialLikes);
      });
    }
  }, [user]);
  
  const handleLogout = () => {
    localStorage.removeItem('loggedBlogUser');
    setUser(null);
  };

  const handleLikeClick = async (blogToUpdate) => {
    console.log("Like button clicked");
    try {
      setLikes((prevLikes) => {
        const updatedLikes = { ...prevLikes };
        updatedLikes[blogToUpdate.id] = (updatedLikes[blogToUpdate.id] || 0) + 1;
        return updatedLikes;
      });
  
      const updatedBlog = { ...blogToUpdate, likes: likes[blogToUpdate.id] + 1 };
      const updatedBlogData = await blogService.update(blogToUpdate.id, updatedBlog);
      console.log('Updated Blog Data:', updatedBlogData);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };
  
  const handleDeleteClick = async (blogToDelete) => {
    try {
      if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
        await blogService.remove(blogToDelete.id);
        setUserBlogs(userBlogs.filter((blog) => blog.id !== blogToDelete.id));
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

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
                  <Blog
                    key={blog.id}
                    blog={blog}
                    handleLikeClick={handleLikeClick}
                    handleDeleteClick={handleDeleteClick}
                    likes={likes[blog.id] || blog.likes} 
                    user={user}
                  />
                </div>
              ))}
            </ul>
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Welcome;
