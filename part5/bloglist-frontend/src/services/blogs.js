import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getBlogsByUserId = async (userId) => {
  const allBlogs = await getAll();
  return allBlogs.filter((blog) => blog.user && blog.user._id === userId)
};

export default { getAll, getBlogsByUserId }
