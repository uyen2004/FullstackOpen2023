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
      const id = action.payload.id;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    initializeAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { addAnecdote, vote, initializeAnecdotes } = anecdoteSlice.actions;
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

