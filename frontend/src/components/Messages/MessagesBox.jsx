import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as messagesSelectors } from '../../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import NewMessageForm from './NewMessageForm.jsx';

const Message = ({ user, message }) => (
  <div className="text-break mb-2" key={message.id}>
    <b>{user}</b>
    :
    {' '}
    {message}
  </div>
);

const MessagesBox = () => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannel?.name}`}</b>
        </p>
        <span className="text-muted">{t('messages.counter.count', { count: channelMessages.length })}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {channelMessages.map((message) => (
          <Message key={message.id} user={message.username} message={message.body} />
        ))}
      </div>
      <NewMessageForm currentChannelId={currentChannelId} />
    </div>
  );
};

export default MessagesBox;
