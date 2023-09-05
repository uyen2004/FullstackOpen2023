import React, { useState } from 'react';

const Statistics = (props) => {
  const total = props.bad + props.good + props.neutral;
  return(
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>average {(props.good + props.bad * -1) / total}</p>
      <p>positive {(props.good/ total)*100}% </p>
    </div>
    )
}

const App = () => {
 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <h1>Statistics</h1>
      <Statistics good = {good} neutral ={neutral} bad ={bad} />
    </div>
  )
}

export default App