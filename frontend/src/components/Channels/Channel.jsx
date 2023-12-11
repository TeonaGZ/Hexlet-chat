import React from 'react';
import { Nav, Button } from 'react-bootstrap';

const Channel = ({ channel, currentId }) => (
  <Nav.Item as="li" className="w-100">
    <Nav.Link as={Button} className="w-100 rounded-0 text-start" variant={currentId === channel.id ? 'secondary' : ''}>
      <span>#</span>
      {channel.name}
    </Nav.Link>
  </Nav.Item>
);

export default Channel;
