import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSignupMutation } from '../../../../redux/services/authApi';
import { FormError, InputField } from './components';
import handleSubmit from './utils/handleSubmit';
import useValidationSchemas from '../../../../shared/hooks/useValidationSchemas';

const SignupForm = () => {
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const initialValues = { username: '', password: '', confirmPassword: '' };

  const validationSchemas = useValidationSchemas();
  const validationSchema = validationSchemas.register;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => handleSubmit(
        values,
        actions,
        signup,
        setError,
        dispatch,
        navigate,
        t,
      )}
    >
      {({ isSubmitting }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">{t('signUp')}</h1>
          <FormError error={error} />
          <InputField name="username" type="text" placeholder={t('validation.nameLengthError')} label="username" />
          <InputField name="password" type="password" placeholder={t('validation.passwordLengthError')} label="password" />
          <InputField name="confirmPassword" type="password" placeholder={t('validation.passwordNotConfirm')} label="confirmPassword" />
          <button type="submit" className="w-100 btn btn-outline-primary" disabled={isSubmitting}>
            {t('goSignUp')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
