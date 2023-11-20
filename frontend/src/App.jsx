import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './components/Root.js';
import LoginForm from './components/LoginForm.js';
import PageNotFound from './components/PageNotFound.js';

const App = () => (
  <BrowserRouter>
    <div>
      <nav />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
