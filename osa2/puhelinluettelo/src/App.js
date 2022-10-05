import { useState, useEffect } from 'react'
import personService from './services/persons'

const Item = ({person, deleteButtonHandler}) => {
  return (
    <li key={person.name}>
    {person.name} {person.number}
    <button onClick={() => deleteButtonHandler(person)}>Delete</button>
    </li>
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

const ItemList = ({persons, deleteButtonHandler}) => {
  return (
    <div>
      <ul>
        {persons.map(person =>
          <Item key={person.name} person={person} deleteButtonHandler={deleteButtonHandler}/>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })  
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    if (!persons.some(p => p.name === newName)) {
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const modifiedPerson = {
          ...persons.find(p => p.name === newName),
          number: newNumber,
        }
        personService
        .modifyPerson(modifiedPerson)
        .then(() => {
          setPersons(persons.map(p => p.id === modifiedPerson.id ? modifiedPerson : p))
        })
      }
        
    }
    setNewName('')
    setNewNumber('')
  }
  
  const handleDeleteButton = (person) => {
    if (window.confirm(`Remove person ${person.name}?`)) {
      personService
      .deletePerson(person.id)
      .then(() => {
        const newList = persons.filter(p => p.id !== person.id)
        setPersons(newList)
      })
    }
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
      <ItemList persons={namesToShow} deleteButtonHandler={handleDeleteButton}/>
    </div>
  )

}

export default App
