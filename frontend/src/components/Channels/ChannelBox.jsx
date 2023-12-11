import React from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import Channel from './Channel.jsx';
import ChannelsHeader from './ChannelsHeader.jsx';
import { selectors } from '../../slices/channelsSlice.js';

const ChannelsBox = () => {
  const channels = useSelector(selectors.selectAll);
  return (
    <>
      <ChannelsHeader />
      <Nav id="channels-box" as="ul" className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        <Nav.Item as="li" className="w-100">
          {channels.map((channel) => (
            <Channel key={channel.id} channel={channel} currentId={channel.currentChannelId} />
          ))}
        </Nav.Item>
      </Nav>
    </>
  );
};

export default ChannelsBox;
