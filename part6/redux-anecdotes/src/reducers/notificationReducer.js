import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
  name: 'notification',
  initialState: null, 
  reducers: {
    setNotification: (state, action) => {
      return action.payload; 
    },
    clearNotification: () => null, 
  },
});

export const { setNotification, clearNotification } = notificationReducer.actions;
export default notificationReducer.reducer;
