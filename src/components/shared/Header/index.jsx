import React, { useEffect } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

const Header = ({title, children}) => {
  useEffect(() => {
    document.title = title || 'Default tab title if the title property is falsey.';
  });

  return (
    <Container className="my-3">
      <Jumbotron>
        <header>
          <h1>{title || 'Default header title if the title property is falsey'}</h1>
          {/* This is a comment in JSX */}
          {/*
            Below is a ternary statement that is
            checking if the property "children"
            has a value and is rendering it if it
            does. "children" exist when someone places
            content between two tags:
            <tag>{children}</tag>
            When you access the props.children it will
            contain that content.
          */}
          { children ? (
            <>
              <hr/>
              { children }
            </>
          ) : null }
        </header>
      </Jumbotron>
    </Container>
  );
}
 
export default Header;