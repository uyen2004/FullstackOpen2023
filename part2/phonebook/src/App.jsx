import React, { useState, useEffect } from 'react'
import Person from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import personService from './services/Persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [noti, setNoti] = useState({ message: null, isError: false })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log("Response received:", initialPersons)
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching data:', error)
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

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (!personToDelete) return

    setIsDeleting(true)

    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)
    if (confirmDelete) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNoti({ message: `Deleted '${personToDelete.name}'`, isError: false })
          setTimeout(() => {
            setNoti({ message: null, isError: false })
          }, 5000)
        })
        .catch(error => {
          console.error('Error on deleting:', error)
          setNoti({ message: 'Error deleting the person', isError: true })
          setTimeout(() => {
            setNoti({ message: null, isError: false })
          }, 5000)
        })
        .finally(() => { 
          setIsDeleting(false)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
  
    const existingPerson = persons.find((person) => person.name === newName)
  
    if (existingPerson && !isDeleting) {
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
            );
            setNewName('')
            setNewPhone('')
            setNoti({ message: `Updated '${returnedPerson.name}'`, isError: false })
            setTimeout(() => {
              setNoti({ message: null, isError: false })
            }, 5000)
          })
          .catch((error) => {
            console.error('Cannot update person:', error);
            setNoti({
              message: `'${existingPerson.name}' has already been removed from this server`,
              isError: true,
            })
            setTimeout(() => {
              setNoti({ message: null, isError: false })
            }, 5000)
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
          setNoti({ message: `Added '${returnedPerson.name}'`, isError: false })
          setTimeout(() => {
            setNoti({ message: null, isError: false })
          }, 5000)
        })
        .catch((error) => {
          console.error('Error creating person:', error)
          setNoti({
            message: `Error creating '${newName}'`,
            isError: true,
          })
          setTimeout(() => {
            setNoti({ message: null, isError: false })
          }, 5000)
        })
    }
  }
  


  const filteredPersons = persons.filter((person) => {
    if (!search) {
      return true
    }
    if (!person.name) {
      return false
    }
    return person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })
  

  const Notification = ({ message }) => {
    if (!message) {
      return null
    }

    return (
      <div className={message.isError ? 'error' : 'success'}>
        {message.message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h1>Notes</h1>
      <Notification message={noti} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
        noti={noti}
      />
      <h3>Numbers</h3>
      <Person filteredPersons={filteredPersons} handleDelete={handleDelete} />
      {console.log(filteredPersons)}
    </div>
  )
}
export default App