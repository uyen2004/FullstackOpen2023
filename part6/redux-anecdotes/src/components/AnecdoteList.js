import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setFilter
 } from '../reducers/filterReducer';
const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(vote({ id })); 
  };

  const anecdotes = useSelector((state) =>
    state.anecdotes.slice().sort((a, b) => b.votes - a.votes)
  );

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div>
        Filter: <input type="text" value={filter} onChange={handleFilterChange} />
      </div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
