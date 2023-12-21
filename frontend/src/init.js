import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import store from './slices/store.js';
import resources from './locales/index.js';
import AuthProvider from './context/AuthProvider.jsx';
import SocketProvider from './context/SocketProvider.jsx';
import App from './App.jsx';

const init = async () => {
  const socket = io();
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({ resources, lng: 'ru', fallbackLng: 'ru' });

  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </AuthProvider>
      </SocketProvider>
    </Provider>
  );
};

export default init;
