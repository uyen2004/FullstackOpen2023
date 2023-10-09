import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../request';
import { useNotification } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { dispatch: dispatchNotification } = useNotification();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onError: (error) => {
      dispatchNotification({ type: 'setNotification', payload: error.message });
      setTimeout(() => {
        dispatchNotification({ type: 'removeNotification' });
      }, 5000);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
      dispatchNotification({ type: 'setNotification', payload: 'New anecdote created!' });
      setTimeout(() => {
        dispatchNotification({ type: 'removeNotification' });
      }, 5000);
    },
  });

  const handleCreateAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content });
      event.target.anecdote.value = '';
    } else {
      dispatchNotification({ type: 'setNotification', payload: 'Anecdote content must be at least 5 characters long.' });
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
