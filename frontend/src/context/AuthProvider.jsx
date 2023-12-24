import { useState, useMemo, useCallback } from 'react';
import { AuthContext } from './index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [user, setUser] = useState(currentUser);

  const logIn = (loginData) => {
    localStorage.setItem('userId', JSON.stringify(loginData));
    setUser(loginData);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  const getAuthHeader = useCallback(() => {
    if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }
    return {};
  }, [currentUser]);

  const valuesOfProvider = useMemo(() => ({
    currentUser,
    user,
    logIn,
    logOut,
    getAuthHeader,
  }), [user, currentUser, getAuthHeader]);

  return (
    <AuthContext.Provider value={valuesOfProvider}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
