import Axios from 'axios';
import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../../Authentication/UserProvider';
import { Container } from 'react-bootstrap';
import Header from '../../shared/Header';
import UserForm from '../UserForm';

const Edit = () => {
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    Axios.get(`http://localhost:4000/users/show?secret_token=${user.token}`)
    .then(({ data }) => {
      setUserDetails(data);
    });
  }, []);

  return (
    userDetails ? (
      <>
        <Header title="Edit your profile!"/>
        
        <Container>
          <p>
            The content is editable under <strong>/src/components/Users/Edit/index.jsx</strong>
          </p>

          <UserForm
            preloadData={ userDetails }
            endpoint="/users/update"
            buttonLabel="Update"
          />
        </Container>
      </>
    ) : null
  );
}
 
export default Edit;