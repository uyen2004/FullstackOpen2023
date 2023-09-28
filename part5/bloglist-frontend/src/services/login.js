import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    console.log('Response Headers:', response.headers)
    return response.data
    
  } catch (error) {
    console.log(error)
  }
}



export default { login }