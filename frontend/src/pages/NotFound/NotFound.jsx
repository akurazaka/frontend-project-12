import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ROUTES from '../../app/routes/routes.data';
import imageSearch from '../../shared/assets/images/imageSearch.svg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('pageNotFound')} src={imageSearch} class="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('pageNotFound')}</h1>
      <p className="text-muted">
        {t('pageNotFoundRedirect1')}
        <Link to={ROUTES.HOME}>{t('pageNotFoundRedirect2')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
