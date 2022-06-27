import { useState } from 'react'

const Item = ({person}) => {
  return (
    <li key={person.name}>{person.name} {person.number}</li>
  )
}

const AddForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const FilterForm = ({filter, handleFilterChange}) => {
  return (
    <div>
      Filter results: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const ItemList = ({persons}) => {
  return (
    <div>
      <ul>
        {persons.map(person =>
          <Item key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: 12345678,
    },
    { name: 'Testi Nimi',
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
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />
      Add new
      <AddForm addName={addName} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ItemList persons={namesToShow} />
    </div>
  )

}

export default App
