import React, { useState, useEffect } from 'react'
import Person from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import personService from './services/Persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [noti, setNoti] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (!personToDelete) return

    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Error on deleting:', error)
        })
    }
  }
  const addPerson = (event) => {
    event.preventDefault()
  
    const existingPerson = persons.find((person) => person.name === newName)
  
    if (existingPerson) {
      const confirmReplace = window.confirm(
        `${newName} is already in the phonebook, replace the old number with a new one?`
      )
  
      if (confirmReplace) {
        const updatedPerson = { ...existingPerson, number: newPhone }
  
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedPerson : person
              )
            )
            setNewName('')
            setNewPhone('')
            setNoti(
              `Added '${personObject.name}' `
            )
            setTimeout(() => {
              setNoti(null)
            }, 5000)
          })
          .catch((error) => {
            console.error('Cannot replace:', error);
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
      }
  
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson])
          setNewName('')
          setNewPhone('')
          setNoti(
            `Added ${personObject.name} `
          )
          setTimeout(() => {
            setNoti(null)
          }, 5000)
        })
        .catch((error) => {
          console.error('Cannot create person:', error)
        })
    }
  }
  
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  )

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className='noti'>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h1>Notes</h1>  
      <Notification message={noti} />
      <div></div>
      <Filter search ={search} handleSearchChange = {handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} newPhone={newPhone} 
        handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} 
        addPerson={addPerson} 
      />
      <h3>Numbers</h3>
      <Person filteredPersons={filteredPersons}  handleDelete={handleDelete}/>
    </div>
  )
}

export default App