import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useMemo } from 'react';
import AuthContext from './context/authContext.jsx';
import RootPage from './components/pages/RootPage.js';
import LoginForm from './components/pages/LoginForm.js';
import PageNotFound from './components/pages/PageNotFound.js';
import Nav from './components/Nav.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const valuesOfProvider = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={valuesOfProvider}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
