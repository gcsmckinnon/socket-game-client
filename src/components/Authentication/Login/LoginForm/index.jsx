import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../../UserProvider';
import { NotificationContext } from '../../../shared/Notifications';
import { GlobalStoreContext } from '../../../shared/Globals';
import Axios from 'axios';

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const { globalStore } = useContext(GlobalStoreContext);
  const [inputs, setInputs] = useState({});
  
  const handleChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    console.log("Handling the submit");

    if (inputs && inputs.email && inputs.password) {
      Axios.post(`${globalStore.REACT_APP_ENDPOINT}/authenticate`, inputs)
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem('token', data.token);

        if (data && data.token) {
          setNotification({
            type: "success",
            message: "You have successfully logged in."
          });
        } else {
          setNotification({
            type: "danger",
            message: "Please check your email and password."
          });
        }
      })
      .catch(error => {
        console.error(error.message);
        
        setNotification({
          type: "danger",
          message: "Please check your email and password."
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p>
        The form is editable under <strong>/src/components/Authentication/Login/LoginForm/index.jsx</strong>
      </p>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          onChange={handleChange}
          type="password"
        />
      </Form.Group>

      <Form.Group>
        <Button type="submit">Login</Button>
      </Form.Group>
    </Form>
  );
}
 
export default LoginForm;