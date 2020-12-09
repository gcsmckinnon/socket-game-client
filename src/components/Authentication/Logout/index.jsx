import Axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../UserProvider';
import { GlobalStoreContext } from '../../shared/Globals';
import { NotificationContext } from '../../shared/Notifications';

const Logout = () => {
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const { globalStore } = useContext(GlobalStoreContext);
  
  useEffect(() => {
    Axios.post(`${globalStore.REACT_APP_ENDPOINT}/logout`, { secret_token: user.token })
    .then(() => {
      setNotification({
        type: 'success',
        message: "You have successfully logged out."
      });
      
      setUser(null);
      localStorage.clear();

      setRedirect(true);
    })
    .catch(error => {
      console.error(error.message);

      setNotification({
        type: 'danger',
        message: "There was an issue logging you out."
      });
    });
  }, [globalStore, setNotification, setUser, user]);

  return (
    redirect ? (
      <Redirect to="/"/>
    ) : null
  );
}
 
export default Logout;