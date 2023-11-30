import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../../utils/useAuth.jsx';
import routes from '../../routes.js';
import Channels from '../Channels.jsx';
import Messages from '../Messages.jsx';

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
    <Container className="h-100 my-4 overflow-hidden rounded-2 shadow">
      <Row className="h-100 d-flex flex-md-row bg-white">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default RootPage;
