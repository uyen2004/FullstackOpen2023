import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    const token = response.headers.authorization
    console.log('Response Headers:', response.headers)
    return response.data
    
  } catch (error) {
  }
}



export default { login }