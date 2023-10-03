import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotesService';

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState, 
  reducers: {
    addAnecdote: (state, action) => {
      state.push(action.payload);
    },
    vote: (state, action) => {
      const { id } = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    initializeAnecdotes: (state, action) => {
      return action.payload;
    },
    updateAnecdote: (state, action) => {
      const updatedAnecdote = action.payload;
      const index = state.findIndex((anecdote) => anecdote.id === updatedAnecdote.id);
      if (index !== -1) {
        state[index] = updatedAnecdote;
      }
    },
  },
});

export const { addAnecdote, vote, initializeAnecdotes, updateAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;


export const fetchAnecdotes = () => {
  return async (dispatch) => {
    try {
      const anecdotes = await anecdoteService.getAll(); 
      dispatch(initializeAnecdotes(anecdotes)); 
    } catch (error) {
      console.error('Error fetching anecdotes:', error);
    }
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const newAnecdote = await anecdoteService.createNew(content);
      dispatch(addAnecdote(newAnecdote));
    } catch (error) {
      console.error('Error creating anecdote:', error);
    }
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    try {
      const updatedAnecdote = await anecdoteService.vote(anecdote);
      dispatch(vote(updatedAnecdote)); 
    } catch (error) {
      console.error('Error voting for anecdote:', error);
    }
  };
};

