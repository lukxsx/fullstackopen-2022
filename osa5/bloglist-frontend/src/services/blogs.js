import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => { token = `bearer ${newToken}` }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (blog) => {
  const headers = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blog, headers)
  return response.data
}

export default {
  getAll,
  addBlog,
  setToken
}