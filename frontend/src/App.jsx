import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import AuthProvider from './context/AuthProvider.jsx';
import SocketProvider from './context/SocketProvider.jsx';
import RootPage from './components/pages/RootPage.js';
import LoginForm from './components/pages/LoginForm.js';
import SignUpForm from './components/pages/SignUpForm.js';
import PageNotFound from './components/pages/PageNotFound.js';
import Nav from './components/Nav.jsx';

const socket = io();

const App = () => (
  <SocketProvider socket={socket}>
    <AuthProvider>
      <BrowserRouter>
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <Nav />
            <Routes>
              <Route path="/" element={<RootPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  </SocketProvider>
);

export default App;
