import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
  name: 'notification',
  initialState: null, 
  reducers: {
    setting: (state, action) => {
      return action.payload; 
    },
    removing: () => null, 
  },
});

export const { setting, removing } = notificationReducer.actions;
export default notificationReducer.reducer;
