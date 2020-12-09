import React, { createContext, useState } from 'react';
import { Alert } from 'react-bootstrap';

export const NotificationContext = createContext();

const NotificationProvider = ({children}) => {
  const [notification, setNotification] = useState(null);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {notification ? (
        <Alert variant={notification.type}>
          {notification.message}
        </Alert>
      ) : null}

      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;