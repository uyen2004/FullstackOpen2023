const express = require('express')
const app = express()
app.use(express.json());
const port = 3001

let persons= [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

app.get('/api/persons', (req, res) => {
  res.json(phonebookEntries);
})

app.get('/info', (req, res) => {
    const requestTime = new Date()
    const numberOfEntries = persons.length
    res.send(`
      <div>
      <p>Phone book has info for ${numberOfEntries} people</p>
      <p> ${requestTime}</p>
      </div>
    `)
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find((p) => p.id === id)
  
    if (!person) {
      return res.status(404).json({ error: 'the given id is not found' })
    }
  
    res.json(person)
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter((p) => p.id !== id)
    res.status(204).end()
  })

  app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log('Request body:', body)
  
    if (!body.name || !body.number) {
      return res.status(400).json({ error: 'Name and number are required' })
    }
  
    if (persons.some((person) => person.name === body.name)) {
      return res.status(400).json({ error: 'Existed name' })
    }
  
    const id = generateUniqueId()
    const newPerson = {
      id,
      name: body.name,
      number: body.number,
    }
  
    persons = persons.concat(newPerson)
    res.json(newPerson)
  })

  function generateUniqueId() {
    return Math.floor(Math.random() * 100)
  }

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
