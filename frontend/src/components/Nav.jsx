import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Nav = () => (
  <div className="d-flex flex-column h-100">
    <Navbar expand="lg" variant="light" bg="wight" className=" shadow-sm">
      <Container>
        <Navbar.Brand href="/">Chat</Navbar.Brand>
      </Container>
    </Navbar>
  </div>
);

export default Nav;
