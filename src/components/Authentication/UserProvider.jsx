import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUser({ token });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;