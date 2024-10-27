import { useTranslation } from 'react-i18next';
import SignupForm from './SignupForm';
import imageSearch from '../../../shared/assets/images/imageSearch.svg';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <img
                src={imageSearch}
                className="rounded-circle"
                alt={t('signUp')}
                style={{ maxWidth: '250px' }}
              />
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
