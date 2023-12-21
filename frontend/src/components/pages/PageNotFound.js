import React from 'react';
import { useTranslation } from 'react-i18next';
import image from '../../images/NotFoundImage.svg';
import routes from '../../routes.js';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        className="img-fluid h-25"
        alt={t('pageNotFound')}
        src={image}
      />
      <h1 className="h4 text-muted">{t('errors.pageNotFound')}</h1>
      <p className="text-muted">
        {t('canReroute')}
        <a href={routes.rootPage}>{t('rootPage')}</a>
      </p>
    </div>
  );
};

export default PageNotFound;
