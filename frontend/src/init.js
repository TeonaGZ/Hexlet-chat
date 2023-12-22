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

const rollbarConfig = {
  accessToken: 'REACT_APP_ROLLBAR_TOKEN',
  // captureUncaught: true,
  // captureUnhandledRejections: true,
  environment: 'testnv',
};
function TestError() {
  try {
    const a = null;
    return a.hello();
  } catch (error) {
    // Здесь вы передаете ошибку в Rollbar
    // Также можно добавить логирование в консоль для отладки
    console.error(error);
    throw error;
  }
}

const init = async () => {
  const socket = io();
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({ resources, lng: 'ru', fallbackLng: 'ru' });

  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <RollbarProvider config={rollbarConfig}>
              <ErrorBoundary>
                <TestError />
                <App />
              </ErrorBoundary>
            </RollbarProvider>
          </I18nextProvider>
        </AuthProvider>
      </SocketProvider>
    </Provider>
  );
};

export default init;
