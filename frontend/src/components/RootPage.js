import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../utils/useAuth.jsx';

const RootPage = () => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <p>Chat</p>;
};

export default RootPage;
