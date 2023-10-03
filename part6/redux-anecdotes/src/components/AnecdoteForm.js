import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setting } from '../reducers/notificationReducer'; 
import  anecdoteService  from '../services/anecdotesService'; 

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const newAnecdote = await anecdoteService.createNewAnecdote(content);
    dispatch(addAnecdote(newAnecdote));
    dispatch(setting(`Added anecdote: ${content}`));
    e.target.anecdote.value = '';
  };
  

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
