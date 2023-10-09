import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  message: '', 
};

export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'setNotification':
      return { ...state, message: action.payload };
    case 'removeNotification':
      return { ...state, message: '' };
    default:
      return state;
  }
};

export const useNotification = () => {
  return useContext(NotificationContext);
};


export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
