import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
      <div>
        Filter by name: <input value={search} onChange={handleSearchChange} />
      </div>
      <form onSubmit={addPerson}> {}
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </div>
  )
}

export default App
