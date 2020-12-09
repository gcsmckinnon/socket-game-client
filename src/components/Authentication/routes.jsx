import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { UserContext } from './UserProvider';

import Logout from './Logout';
import Login from './Login';

const Routes = () => {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      <Route exact path="/login" component={() => {
        if (user) return(<Redirect to="/"/>);
        return <Login/>;
      }}/>
      <Route exact path="/logout" component={() => {
        if (!user) return (<Redirect to="/"/>);
        return <Logout/>
      }}/>
    </Switch>
  );
}
 
export default Routes;