import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../Authentication/UserProvider';

import Index from './index';

const Routes = () => {
  const { user } = useContext(UserContext);
  
  return (
    <Switch>
      {user && user.token ? (
        <Route exact path="/games" component={Index}/>
      ) : null}
    </Switch>
  );
}
 
export default Routes;