import { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../../../../redux/services/authApi';
import { USER } from '../../../../shared/constants';
import useValidationSchemas from '../../../../shared/hooks/useValidationSchemas';
import ROUTES from '../../../../app/routes/routes.data';

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loginError, setLoginError] = useState('');

  const validationSchemas = useValidationSchemas();
  const validationSchema = validationSchemas.login;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await login(values).unwrap();
      localStorage.setItem(USER, JSON.stringify(result));
      navigate(ROUTES.HOME);
    } catch (error) {
      setLoginError(t('validation.invalidUsernameOrPassword'));
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">{t('loading')}</span>
          ...
        </div>
      </div>
    );
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">{t('login')}</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              autoComplete="username"
              required
              placeholder={t('yourNickName')}
              id="username"
              className="form-control"
            />
            <label htmlFor="username">{t('yourNickName')}</label>
            <ErrorMessage name="username" component="div" className="text-danger" />
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              autoComplete="current-password"
              required
              placeholder={t('password')}
              type="password"
              id="password"
              className="form-control"
            />
            <label htmlFor="password">{t('password')}</label>
            <ErrorMessage name="password" component="div" className="text-danger" />
            {loginError && (
              <div className="text-danger">
                {loginError}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-100 mb-3 btn btn-outline-primary"
            disabled={isSubmitting}
          >
            {t('login')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
