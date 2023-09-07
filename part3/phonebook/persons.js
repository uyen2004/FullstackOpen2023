import express from 'express'
import morgan from 'morgan'

const app = express()
const port = 3001

morgan.token('req-body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

let persons = [
  {
    id: 1,
    content: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    content: "Ada Lovelace",
    nummber: "39-44-532523"
  },
  {
    id: 3,
    content: "Dan Abramov",
    number : "12-43-234345"
  },
  {
    id: 4,
    content: "Mary Poppendick",
    number : "39-23-6423122"
  }
]
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)

  if (!person) {
    return res.status(404).json({ error: 'Invalid id' })
  }

  res.json(person);
});

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

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name and number are required' })
  }

  if (persons.some((person) => person.name === body.name)) {
    return res.status(400).json({ error: 'Name must be unique' })
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
  return Math.floor(Math.random() * 100);
}

app.use(morgan('tiny'))
app.use(json())

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})