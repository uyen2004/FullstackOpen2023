const mongoose = require('mongoose')
require('dotenv').config()

const password = process.env.PASSWORD
const url = process.env.MONGODB_URI

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name,
    number,
  })

  person.save().then(() => {
    console.log(`Successful added to phonebook`)
    mongoose.connection.close()
  });
} else {
  mongoose.connection.close()
}
