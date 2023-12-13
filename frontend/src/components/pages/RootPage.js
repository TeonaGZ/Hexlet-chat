import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../../utils/useAuth.jsx';
import routes from '../../routes.js';
import ChannelsBox from '../Channels/ChannelBox.jsx';
import MessagesBox from '../Messages/MessagesBox.jsx';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as messagesActions } from '../../slices/messagesSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const RootPage = () => {
  const auth = useAuth();
  const headers = getAuthHeader();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataPath, { headers });
        dispatch(channelsActions.addChannels(data.channels));
        dispatch(channelsActions.setCurrentChannel(data.currentChannelId));
        dispatch(messagesActions.addMessages(data.messages));
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          auth.logOut();
        }
        throw err;
      }
    };
    fetchData();
  }, [dispatch, auth, headers]);

  if (!auth.loggedIn) {
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
