const Person = ({ filteredPersons, handleDelete }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person._id}>
          {person.name} {person.number}   
          <button onClick={() => handleDelete(person._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default Person
