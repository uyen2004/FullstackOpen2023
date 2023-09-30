import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import { combineReducers } from 'redux'; 
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: [...getDefaultMiddleware(), thunk], 
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
