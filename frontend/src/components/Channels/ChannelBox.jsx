import React from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import Channel from './Channel.jsx';
import ChannelsHeader from './ChannelsHeader.jsx';
import { selectors } from '../../slices/channelsSlice.js';

const ChannelsBox = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector(selectors.selectCurrentChannelId);

  return (
    <>
      <ChannelsHeader />
      <Nav id="channels-box" as="ul" fill className="flex-column px-2 mb-3 overflow-auto h-100 d-block" variant="pills">
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} currentChannelId={currentChannelId} />
        ))}
      </Nav>
    </>
  );
};

export default ChannelsBox;
