import { useState, useMemo } from 'react';
import { AuthContext } from './index.js';

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

export default AuthProvider;
