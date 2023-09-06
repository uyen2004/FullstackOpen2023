import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook.`);
      setNewName('');
      return
    }
    const nameObject = {
      name: newName,
    }
    setPersons([...persons, nameObject])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}> {}
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, index) => (
          <Person key={index} person={person} />
        ))}
      </div>
    </div>
  )
}

export default App
