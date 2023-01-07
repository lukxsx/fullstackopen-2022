import axios from 'axios'
const baseUrl = '/api/blogs'

let headers = null
const setToken = newToken => { headers = { headers: { Authorization: `bearer ${newToken}` } } }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, headers)
  return response.data
}

const addLike = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, headers)
  return response.data
}

const deleteBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, headers)
  return response.data
}

const exportedObject = {
  getAll,
  addBlog,
  addLike,
  deleteBlog,
  setToken
}
export default exportedObject