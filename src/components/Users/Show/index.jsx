import Axios from 'axios';
import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../../Authentication/UserProvider';
import { GlobalStoreContext } from '../../shared/Globals';
import { NotificationContext } from '../../shared/Notifications';
import { Container, Media } from 'react-bootstrap';
import Header from '../../shared/Header';
import { Link } from 'react-router-dom';

const Show = () => {
  const { user } = useContext(UserContext);
  const { globalStore } = useContext(GlobalStoreContext);
  const { setNotification } = useContext(NotificationContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    Axios.get(`${globalStore.REACT_APP_ENDPOINT}/users/show?secret_token=${user.token}`)
    .then(({ data }) => {
      setUserDetails(data);
    });
  }, []);

  return (
    userDetails ? (
      <>
        <Header title="Your title for the Header component block">
          <p>
            This paragraph will be the value for <strong>&#123;children&#125;</strong> in the <strong>Header component</strong>.
          </p>

          <p>
            The header is editable under <strong>/src/components/Users/Show/index.jsx</strong>
          </p>
        </Header>

        <Container>
          <p>
            The content is editable under <strong>/src/components/Users/Show/index.jsx</strong>
          </p>

          <Media>
            <img
              src="https://via.placeholder.com/150"
              width={150}
              height={150}
              className="mr-3"
            />
            <Media.Body>
              <h5>{userDetails.name}</h5>
              <p>
                <strong>Email:</strong>&nbsp;{userDetails.email}
              </p>

              <p>
                <strong>Since:</strong>&nbsp;{userDetails.createdAt}
              </p>

              <p>
                <Link to="/profile/edit">Edit profile...</Link>
              </p>
            </Media.Body>
          </Media>
        </Container>
      </>
    ) : null
  );
}
 
export default Show;