import React, { useState, useEffect } from 'react';
import Person from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([])

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