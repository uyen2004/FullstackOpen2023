import  { useState } from 'react';
import PropTypes from 'prop-types';

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
    handleLikeClick({ ...blog, likes: blog.likes + 1 });
  };

  const handleDelete = () => {
      handleDeleteClick(blog);
  };

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLikeClick: PropTypes.func.isRequired,
    handleDeleteClick: PropTypes.func.isRequired,
    likes: PropTypes.number.isRequired,
  };


  return (
    <div className="blog">
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails} data-testid={`toggle-details-${blog.id}`}>
          {showDetails ? 'Hide' : 'View'} Details
        </button>
        
        {user && user.username === blog.user.username && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button data-testid={`like-button-${blog.id}`} onClick={handleLike}>Like</button>
          </div>
          {blog.user && (
            <div>{blog.user.name}</div>
          )}  
        </div>
      )}
    </div>
    </div>
  );
};

export default Blog;
