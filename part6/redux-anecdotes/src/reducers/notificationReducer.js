import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setting: (state, action) => action.payload,
    moving: (state) => null,
  },
});

export const { setting, moving } = notificationSlice.actions;
export default notificationSlice.reducer;
export const displayNotification = (message, timeoutInSeconds) => {
  return (dispatch) => {
    dispatch(setting(message));

    setTimeout(() => {
      dispatch(moving());
    }, timeoutInSeconds * 1000);
  };
};


