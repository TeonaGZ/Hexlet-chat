import React from 'react';
import { useDispatch } from 'react-redux';
import { Nav, Button } from 'react-bootstrap';
import { actions as channelActions } from '../../slices/channelsSlice.js';

const Channel = ({ channel, currentChannelId }) => {
  const dispatch = useDispatch();

  const handleSelectChannel = () => {
    dispatch(channelActions.changeChannel(channel.id));
  };

  return (
    <Nav.Item as="li" className="w-100">
      <Button onClick={handleSelectChannel} className="w-100 rounded-0 text-start" variant={channel.id === currentChannelId && 'secondary'}>
        <span>#</span>
        {channel.name}
      </Button>
    </Nav.Item>
  );
};

export default Channel;
