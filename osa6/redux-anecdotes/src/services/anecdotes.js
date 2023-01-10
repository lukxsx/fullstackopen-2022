import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (anecdote) => {
    const response = await axios.post(baseUrl, { content: anecdote, votes: 0 })
    return response.data
}

const updateAnecdote = async (anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}

const returnObject = { getAll, createAnecdote, updateAnecdote }
export default returnObject