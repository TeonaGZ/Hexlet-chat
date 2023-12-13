import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { SocketContext } from './index';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(channelsActions.addChannel(channel));
  });
  socket.on('renameChannel', ({ id, name }) => {
    dispatch(channelsActions.renameChannel({ id, changes: { name } }));
  });
  socket.on('removeChannel', ({ id }) => {
    dispatch(channelsActions.removeChannel(id));
  });

  const valuesOfProvider = useMemo(() => (
    {
      addMessage: async (body, currentChannelId, userId) => {
        await socket.emit('newMessage', { body, currentChannelId, userId });
      },
      addChannel: async (values) => {
        const { data } = await socket.emitWithAck('newChannel', values);
        dispatch(channelsActions.addChannel(data));
        dispatch(channelsActions.setCurrentChannel(data.id));
      },
      renameChannel: async (id, name) => {
        await socket.emit('renameChannel', { id, name });
      },
      removeChannel: async (id) => {
        await socket.emit('removeChannel', { id });
      },
    }), [socket, dispatch]);

  return (
    <SocketContext.Provider value={valuesOfProvider}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
