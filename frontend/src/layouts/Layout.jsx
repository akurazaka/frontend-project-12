import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useLogout from '../shared/hooks/useLogout';
import useAuth from '../shared/hooks/useAuth';
import ROUTES from '../app/routes/routes.data';

const Layout = () => {
  const { isAuth } = useAuth();
  const logout = useLogout();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-100 bg-light" id="chat">
      <div className="d-flex flex-column h-100">
        <div className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Link to={ROUTES.HOME} className="navbar-brand">
              Hexlet Chat
            </Link>
            {isAuth && (
              <button type="button" className="btn btn-primary ml-auto" onClick={handleLogout}>
                {t('logout')}
              </button>
            )}
          </div>
        </div>
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Layout;
