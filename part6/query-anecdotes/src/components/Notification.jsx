import React, { useContext, useEffect } from 'react';
import { NotificationContext } from '../NotificationContext';

const Notification = () => {
  const { state, dispatch } = useContext(NotificationContext);

  useEffect(() => {
    if (state.message) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'removeNotification' });
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [state.message, dispatch]);

  console.log('Notification component rendered.'); 

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: state.message ? 'block' : 'none',
  };

  return (
    <div style={style}>
      {state.message}
    </div>
  );
};

export default Notification;
