import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Authentication/UserProvider';

const NavLink = (props) => {
  // This function allows us to use React Router
  // with React Bootstrap. Booooya
    return (
    <Nav.Link
      href={props.href}
      onClick={e => {
        e.preventDefault();
        props.navigate(props.href);    
      }}
    >
      {props.children}
    </Nav.Link>
  );
};

const Navigation = () => {
  const { user } = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>MOFO Gaming</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" component={NavLink}>Home</Link>

          {user && user.token ? (
            <>
              <Link to="/games" component={NavLink}>Games</Link>
              <Link to="/profile" component={NavLink}>Profile</Link>
              <Link to="/profile/edit" component={NavLink}>Edit Profile</Link>
              <Link to="/logout" component={NavLink}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" component={NavLink}>Login</Link>
              <Link to="/register" component={NavLink}>Register</Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
 
export default Navigation;