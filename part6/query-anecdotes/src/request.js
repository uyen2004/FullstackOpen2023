import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () =>
  axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = async (newAnecdote) => {
  if (newAnecdote.content.length < 5) {
    throw new Error('Anecdote content must be at least 5 characters long.');
  }

  try {
    const response = await axios.post(baseUrl, newAnecdote);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const voteAnecdote = async (anecdoteId) => {
  try {
    const existingAnecdote = await axios.get(`${baseUrl}/${anecdoteId}`);

    const updatedAnecdote = {
      ...existingAnecdote.data,
      votes: existingAnecdote.data.votes + 1,
    };

    await axios.put(`${baseUrl}/${anecdoteId}`, updatedAnecdote);

    return updatedAnecdote;
  } catch (error) {
    throw error;
  }
};
