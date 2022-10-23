import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const modifyPerson = modifiedPerson => {
  const request = axios.put(`${baseUrl}/${modifiedPerson.id}`, modifiedPerson)
  return request
}

const personService = {
  getAll,
  create,
  deletePerson,
  modifyPerson,
}

export default personService