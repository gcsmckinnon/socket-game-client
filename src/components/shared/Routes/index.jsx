import React from 'react';
import PageRoutes from '../../Pages/routes';
import UserRoutes from '../../Users/routes';
import GameRoutes from '../../Games/routes';
import AuthenticationRoutes from '../../Authentication/routes';

const Routes = () => {
  return (
    <>
      <PageRoutes/>
      <UserRoutes/>
      <GameRoutes/>
      <AuthenticationRoutes/>
    </>
  );
}
 
export default Routes;