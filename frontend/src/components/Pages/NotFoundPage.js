import React from 'react';
import { useTranslation } from 'react-i18next';
import imageSearch from '../images/imageSearch.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        alt={t('notFound')}
        className="img-fluid h-25"
        src={imageSearch}
      />
      <h1>{t('notFound')}</h1>
      <p>
        {t('directTo')}
        <a href="/">{t('mainPage')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
