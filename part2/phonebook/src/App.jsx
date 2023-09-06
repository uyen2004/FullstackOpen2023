import React, { useState, useEffect } from 'react';
import Person from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook.`);
      setNewName('');
      return
    }
    const personObject = {
      name: newName,
      number : newPhone,
      id: persons.length + 1,
    }
    setPersons([...persons, personObject])
    setNewName('')
    setNewPhone('')
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search ={search} handleSearchChange = {handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} newPhone={newPhone} 
        handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} 
        addPerson={addPerson} 
      />
      <h3>Numbers</h3>
      <Person filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
