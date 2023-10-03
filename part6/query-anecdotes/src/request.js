import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes= () =>
  axios.get(baseUrl).then(res => res.data)


export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

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