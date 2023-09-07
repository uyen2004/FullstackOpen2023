const Person = ({ filteredPersons , handleDelete }) => {
    return (
      <div>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}   
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </div>
      ))}
    </div>
    )
  }
  
  export default Person