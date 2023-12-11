import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../../utils/useAuth.jsx';
import routes from '../../routes.js';
import ChannelsBox from '../Channels/ChannelBox.jsx';
import MessagesBox from '../Messages/MessagesBox.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export const loader = async () => {
  const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
  return data;
};

const RootPage = () => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 flex-md-row bg-white">
        <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelsBox />
        </Col>
        <Col className="p-0 h-100">
          <MessagesBox />
        </Col>
      </Row>
    </Container>
  );
};

export default RootPage;
