import React from 'react';
import { useQuery } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import axios from 'axios'; 

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () =>
      axios
        .get('http://localhost:3001/anecdotes')
        .then((res) => res.data),
    retry: false,
  });

  if (result.isError) {
    return (
      <div>Anecdote service is not available due to problems with the server.</div>
    );
  }

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  const { data } = result;

  const handleVote = (anecdote) => {
    console.log('vote');
  };

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {Array.isArray(data) &&
        data.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      {!Array.isArray(data) && (
        <div>Unexpected data format: {JSON.stringify(data)}</div>
      )}
    </div>
  )
}

export default App
