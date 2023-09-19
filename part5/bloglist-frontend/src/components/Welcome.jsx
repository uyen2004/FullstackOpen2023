import React, { useEffect, useState } from 'react';
import blogService from '../services/blogs';

const Welcome = ({ user, loginForm }) => {
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    if (user) {
      console.log('User:', user.id)
      blogService.getBlogsByUserId(user.id).then((filteredBlogs) => {
        console.log('Filtered Blogs:', filteredBlogs)
        setUserBlogs(filteredBlogs)
      });
    }
  }, [user]);

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username} logged in</p>
          {userBlogs.length > 0 ? (
            <ul>
              {userBlogs.map((blog) => (
                <li key={blog.id}>
                    {blog.title} {blog.author}
                </li>
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
