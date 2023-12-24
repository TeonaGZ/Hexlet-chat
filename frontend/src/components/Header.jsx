import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../utils/useAuth.jsx';
import routes from '../routes.js';

const Header = () => {
  const { user, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" variant="light" className="shadow-sm bg-wight">
      <Container>
        <Navbar.Brand href={routes.rootPage}>{t('chat')}</Navbar.Brand>
        {!!user && <Button type="button" onClick={logOut}>{t('exit')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
