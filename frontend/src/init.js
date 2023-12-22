import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import store from './slices/store.js';
import resources from './locales/index.js';
import AuthProvider from './context/AuthProvider.jsx';
import SocketProvider from './context/SocketProvider.jsx';
import App from './App.jsx';

const init = async () => {
  const socket = io();
  const i18n = i18next.createInstance();

  const rollbarConfig = {
    accessToken: 'bf21624cf472494e8cee3e0c63c9f2d9',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'testenv',
  };
  function TestError() {
    const a = null;
    return a.hello();
  }

  await i18n.use(initReactI18next).init({ resources, lng: 'ru', fallbackLng: 'ru' });

  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <RollbarProvider config={rollbarConfig}>
              <ErrorBoundary>
                <App />
                <TestError />
              </ErrorBoundary>
            </RollbarProvider>
          </I18nextProvider>
        </AuthProvider>
      </SocketProvider>
    </Provider>
  );
};

export default init;
