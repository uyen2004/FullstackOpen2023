import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit'; 
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducers/anecdoteReducer';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: reducer,
  middleware: [thunk]
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
