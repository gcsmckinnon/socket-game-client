import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../shared/Header';

const Home = () => {
  return (
    <>
      <Header title="Your title for the Header component block">
        <p>
          This paragraph will be the value for <strong>&#123;children&#125;</strong> in the <strong>Header component</strong>.
        </p>

        <p>
          The header is editable under <strong>/src/components/Pages/Home/index.jsx</strong>
        </p>
      </Header>

      <Container>
        <hr/>

        <p>
          The content is editable under <strong>/src/components/Pages/Home/index.jsx</strong>
        </p>

        <p>You home page content!</p>
      </Container>
    </>
  );
}
 
export default Home;