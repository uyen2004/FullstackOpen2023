const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const router = express.Router()
require('dotenv').config()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

const mongoURI = process.env.MONGODB_URI

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

  app.use('/api', router)


morgan.token('req-body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :req-body')
)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

router.get('/persons', (req, res) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => {
      console.error('Error fetching persons:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

router.delete('/persons/:id', async (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }

  try {
    const removedPerson = await Person.findByIdAndRemove(id)
    if (!removedPerson) {
      return res.status(404).json({ error: 'Person not found' })
    }
    res.status(204).end()
  } catch (error) {
    console.error('Error deleting person:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})



router.get('/info', (req, res) => {
    const requestTime = new Date()
    const numberOfEntries = persons.length
    res.send(`
      <div>
      <p>Phone book has info for ${numberOfEntries} people</p>
      <p> ${requestTime}</p>
      </div>
    `)
  })

  router.get('/persons/:id', (req, res) => {
    const id = req.params.id
      Person.findById(id)
      .then((person) => {
        if (!person) {
          return res.status(404).json({ error: 'Person not found' })
        }
        res.json(person)
      })
      .catch((error) => {
        console.error('Error fetching person by ID:', error)
      })
  })
  
  

  router.post('/persons', async (req, res) => {
    const body = req.body;
  
    try {
      const newPerson = new Person({
        name: body.name,
        number: body.number,
      })
  
      const savedPerson = await newPerson.save()
      res.json(savedPerson);
    } catch (error) {
      console.error('Error creating person:', error)
    }
  })

  router.put('/persons/:id', (req, res) => {
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

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
   app.use(unknownEndpoint)

   const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    response.status(500).json({ error: 'Internal Server Error' })
    next(error)
  }
  
  app.use(errorHandler)

  app.use(express.static('dist'))
  const port = 3000

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on ${port}`)
  })

  module.exports = router