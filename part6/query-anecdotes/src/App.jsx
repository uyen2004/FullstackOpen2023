import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import { getAnecdotes, voteAnecdote } from './request';
import { useNotification } from './NotificationContext';
import Notification from './components/Notification'; 

const App = () => {
  const queryClient = useQueryClient();
  const { state: notificationState, dispatch: dispatchNotification } = useNotification();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes(),
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

  const handleVote = async (anecdote) => {
    try {
      const updatedAnecdote = await voteAnecdote(anecdote.id);

      queryClient.setQueryData(['anecdotes'], (oldData) => {
        return oldData.map((a) =>
          a.id === updatedAnecdote.id ? updatedAnecdote : a
        );
      });

      dispatchNotification({ type: 'setNotification', payload: `Anecdote '${anecdote.content}' voted` });

      setTimeout(() => {
        dispatchNotification({ type: 'removeNotification' });
      }, 5000);
    } catch (error) {
      console.error('Error voting for anecdote:', error);
    }
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
  );
};

export default App;
