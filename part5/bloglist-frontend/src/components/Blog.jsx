import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, handleLikeClick, handleDeleteClick, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLike = () => {
    handleLikeClick(blog);
  };

  const handleDelete = () => {
      handleDeleteClick(blog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? 'Hide' : 'View'} Details
        </button>
        <button onClick={handleLike}>Like</button>
        {user && user.username === blog.user.username && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}
          </div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
