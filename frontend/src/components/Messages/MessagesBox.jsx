import React from 'react';
import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import NewMessageForm from './NewMessageForm.jsx';

const Message = ({ user, message }) => (
  <>
    <b>{user}</b>
    :
    {' '}
    {message}
  </>
);

const MessagesBox = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector(messagesSelectors.selectAll);
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# general ${currentChannel?.name}`}</b>
        </p>
        <span className="text-muted">Сообщений</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {channelMessages.map((message) => (
          <div className="text-break mb-2" key={message.id}>
            <Message key={message.id} user={message.username} message={message.body} />
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <NewMessageForm />
      </div>
    </>
  );
};

export default MessagesBox;
