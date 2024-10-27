import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm/LoginForm';
import Avatar from '../../../shared/assets/images/avatar.jpg';
import ROUTES from '../../../app/routes/routes.data';

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={Avatar}
                  alt={t('login')}
                  className="rounded-circle"
                  style={{ maxHeight: '200px' }}
                />
              </div>
              <LoginForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('dontHaveAcc')}
                  ?
                  {' '}
                </span>
                <Link to={ROUTES.SIGN_UP}>{t('signUp')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
