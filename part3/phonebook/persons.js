import express from 'express';

const app = express()
const port = 3001

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
app.get('/info', (req, res) => {
  const requestTime = new Date();
  const numberOfEntries = persons.length;
  res.send(`
    <div>
    <p>Phone book has info for ${numberOfEntries} people</p>
    <p> ${requestTime}</p>
    </div>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});