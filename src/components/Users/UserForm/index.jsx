import React from 'react';
import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import { UserContext } from '../../Authentication/UserProvider';
import { GlobalStoreContext } from '../../shared/Globals';
import { NotificationContext } from '../../shared/Notifications';
import { Redirect } from 'react-router-dom';

const UserForm = ({ endpoint, preloadData = {}, buttonLabel }) => {
  const { globalStore } = useContext(GlobalStoreContext);    
  const { user, setUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);

  const [inputs, setInputs] = useState({
    ...preloadData,
    emailConfirmation: (preloadData && preloadData.email)
  });
  const [redirect, setRedirect] = useState(false);
  
  const handleChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (inputs && inputs.email) {
      Axios.post(`${globalStore.REACT_APP_ENDPOINT}/${endpoint}`, {
        ...inputs,
        secret_token: (user && user.token)
      })
      .then(({ data }) => {
        if (data && data.token) setUser(data);

        setNotification({
          type: "success",
          message: "This action was performed successfully."
        });

        setRedirect(true);
      })
      .catch(error => {
        console.error(error.message);

        setNotification({
          type: "danger",
          message: `There was an issue performing this action: ${error.message}`
        });
      });
    }
  };

  return (
    redirect ? (
      <Redirect to="/Home"/>
    ) : (
      <Form onSubmit={handleSubmit}>
        <p>
          The content is editable under <strong>/src/components/Users/UserForm/index.jsx</strong>
        </p>

        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            onChange={handleChange}
            required
            defaultValue={inputs.name}
          />
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            onChange={handleChange}
            required
            defaultValue={inputs.email}
          />
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Email Confirmation</Form.Label>
          <Form.Control
            name="emailConfirmation"
            onChange={handleChange}
            required
            defaultValue={inputs.emailConfirmation}
          />
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={handleChange}
            required
            defaultValue={null}
          />
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            name="passwordConfirmation"
            type="password"
            onChange={handleChange}
            required
            defaultValue={null}
          />
        </Form.Group>
  
        <Form.Group>
          <Button type="submit">{ buttonLabel || "Register" }</Button>
        </Form.Group>
      </Form>
    )
  );
}
 
export default UserForm;