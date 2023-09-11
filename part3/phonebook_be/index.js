const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(express.json())
app.use(morgan('tiny'))

const cors = require('cors')

app.use(cors())

  morgan.token('req-body', (req) => {
    if (req.method === 'POST') {
      return JSON.stringify(req.body)
    }
    return ''
  })

  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :req-body')
  )

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
    res.json(persons)
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

  app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const updatedPerson = req.body
  
    const personIndex = persons.findIndex((p) => p.id === id)
  
    if (personIndex === -1) {
      return res.status(404).json({ error: 'Person not found' })
    }
  
    persons[personIndex] = {
      ...persons[personIndex],
      ...updatedPerson,
    }
  
    res.json(persons[personIndex])
  })
  app.use(express.static('dist'))
  const port = 3000

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on ${port}`);
  })