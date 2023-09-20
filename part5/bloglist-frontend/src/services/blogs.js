import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getBlogsByUserId = async (userId) => {
  const allBlogs = await getAll()
  return allBlogs.filter((blog) => blog.user && blog.user._id === userId)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, getBlogsByUserId, create, setToken }
