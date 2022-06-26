import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const addName = (event) => {
    console.log(persons)
    event.preventDefault()
    if (!persons.some(p => p.name === newName)) {
      const new_person = {
        name: newName,
      }
      setPersons(persons.concat(new_person))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name}</li>)
          }
      </ul>
    </div>
  )

}

export default App
