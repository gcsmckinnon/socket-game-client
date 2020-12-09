import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../Authentication/UserProvider';

import Index from './index';
import Show from './Show';
import New from './New';
import Edit from './Edit';

const Routes = () => {
  const { user } = useContext(UserContext);
  
  return (
    <Switch>
      <Route exact path="/register" component={New}/>

      {user && user.token ? (
        <>
          <Route exact path="/users" component={Index}/>
          <Route exact path="/profile" component={Show}/>
          <Route exact path="/profile/edit" component={Edit}/>
        </>
      ) : null}
    </Switch>
  );
}
 
export default Routes;