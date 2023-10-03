import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote, fetchAnecdotes } from '../reducers/anecdoteReducer'; 
import { setFilter } from '../reducers/filterReducer';
import { setting, removing } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnecdotes()); 
  }, [dispatch]);

  const handleVote = (anecdote) => {
    dispatch(vote({ id: anecdote.id }));
    dispatch(setting(`You voted "${anecdote.content}"`));

    setTimeout(() => {
      dispatch(removing());
    }, 5000);
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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
