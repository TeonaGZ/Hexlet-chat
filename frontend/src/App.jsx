import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes.js';
import RootPage from './components/pages/RootPage.js';
import LoginForm from './components/pages/LoginForm.js';
import SignUpForm from './components/pages/SignUpForm.js';
import PageNotFound from './components/pages/PageNotFound.js';
import Header from './components/Header.jsx';

const App = () => (
  <BrowserRouter>
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path={routes.rootPage} element={<RootPage />} />
          <Route path={routes.loginForm} element={<LoginForm />} />
          <Route path={routes.signUpForm} element={<SignUpForm />} />
          <Route path={routes.pageNotFound} element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
