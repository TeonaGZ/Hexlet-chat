import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Nav = () => (
  <Navbar expand="lg" variant="light" bg="wight" className="shadow-sm">
    <Container>
      <Navbar.Brand href="/">Chat</Navbar.Brand>
    </Container>
  </Navbar>
);

export default Nav;
