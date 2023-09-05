import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is the same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast is to go well.',
  ]

  const initialVotes = new Array(anecdotes.length).fill(0) 
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)

  const randomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    //console.log(random)
    setSelected(random)
  }

  const quoteVotes = () => {
    setVotes((prevVotes) => {
      const updatedVotes = [...prevVotes]
      updatedVotes[selected]++
      return updatedVotes
    })
  }

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
  )

  const Display = (props) => (
    <div>
      <p>{props.anecdotes[selected]}</p>
    </div>
  )

  const indexOfMaxVotes = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <Display anecdotes={anecdotes} />
        <p>has {votes[selected]} votes</p>
        <Button handleClick={quoteVotes} text="Vote" />
        <Button handleClick={randomAnecdote } text="Next anecdote" />
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <Display anecdotes={anecdotes} />
        <p>has {votes[indexOfMaxVotes]} votes</p>
      </div>
    </div>
  )
}

export default App
