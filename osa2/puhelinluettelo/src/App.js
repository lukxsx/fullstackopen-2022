import { useState } from 'react'

const Item = ({person}) => {
  return (
    <li key={person.name}>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: 12345678,
    },
    { name: 'Kalle Koo',
      number: 12345678,
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  const addName = (event) => {
    console.log(persons)
    event.preventDefault()
    if (!persons.some(p => p.name === newName)) {
      const new_person = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(new_person))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const namesToShow = (filter === "")
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter results: <input value={filter} onChange={handleFilterChange} /></div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {namesToShow.map(person =>
          <Item key={person.name} person={person} />
        )}
      </ul>
    </div>
  )

}

export default App
