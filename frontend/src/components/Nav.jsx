import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import useAuth from '../utils/useAuth.jsx';

const Nav = () => {
  const { loggedIn, logOut } = useAuth();
  return (
    <Navbar expand="lg" variant="light" className="shadow-sm bg-wight">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {!!loggedIn && <Button type="button" onClick={logOut}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Nav;
