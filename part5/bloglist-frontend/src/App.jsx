import  { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Welcome from './components/Welcome';
import BlogForm from './components/BlogForm';
import './index.css';

const App = () => {
  const [noti, setNoti] = useState({ message: null, isError: false });
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [userBlogs, setUserBlogs] = useState([])
  const [errorMessage, setErrorMessage ] = useState([])
  useEffect(() => {
    if (user) {
      console.log('User:', user.id);
      blogService.getBlogsByUserId(user.id).then((filteredBlogs) => {
        console.log('Filtered Blogs:', filteredBlogs);
        setBlogs(filteredBlogs); 
      });
    }
  }, [user]);


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      const storedUser = localStorage.getItem('loggedBlogUser');
      console.log(user.token);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      }
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setNoti({ message: 'Wrong username or password', isError: true });
      setTimeout(() => {
        setErrorMessage(null);
        setNoti({ message: null, isError: false });
      }, 5000);
    }
  };

  const addBlog = async (newBlog) => {
    try {
      console.log('Adding a new blog...');
      const createdBlog = await blogService.create(newBlog);
      setBlogs([...blogs, createdBlog]); 
      setUserBlogs([...userBlogs, createdBlog]);
      setNoti({
        message: `A new blog '${createdBlog.title}' by '${createdBlog.author}' is added`,
        isError: false,
      });
        setTimeout(() => {
        setNoti({ message: null, isError: false });
      }, 5000); 
      return createdBlog;
    } catch (error) {
      console.error('Error creating blog:', error);
      setNoti({ message: `Error in adding a new blog`, isError: true });
  
      setTimeout(() => {
        setNoti({ message: null, isError: false });
      }, 5000);
    }
  };
  
  const loginForm = () => (
    <div>
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
    </div>
  );

  return (
    <div>
      {noti.message && (
        <div className={noti.isError ? 'error' : 'success'}>
          {noti.message}
        </div>
      )}
      {user === null ? (
        loginForm()
      ) : (
        <>
          <Welcome user={user} loginForm={loginForm} setUser={setUser} blogs={blogs} />
          <BlogForm addBlog={addBlog} setBlogs={setBlogs} />
        </>
      )}
    </div>
  );
};

export default App;