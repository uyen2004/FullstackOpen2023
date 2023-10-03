import React from 'react';
import { useMutation, useQueryClient } from 'react-query'; 
import { createAnecdote } from '../request';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const handleCreateAnecdote = async (event) => { 
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content });
      event.target.anecdote.value = '';
    } else {
      console.log("The content of the anecdote is less than 5 characters");
    }
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleCreateAnecdote}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
