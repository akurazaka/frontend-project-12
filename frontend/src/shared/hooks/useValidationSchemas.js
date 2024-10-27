import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const useValidationSchemas = () => {
  const { t } = useTranslation();

  const schemas = {
    register: Yup.object({
      username: Yup.string()
        .min(3, t('validation.nameLengthError'))
        .max(20, t('validation.nameLengthError'))
        .required(t('validation.required')),
      password: Yup.string()
        .min(6, t('validation.passwordLengthError'))
        .required(t('validation.required')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], t('validation.passwordNotConfirm'))
        .required(t('validation.required')),
    }),
    login: Yup.object({
      username: Yup.string().required(t('validation.required')),
      password: Yup.string().required(t('validation.required')),
    }),
  };

  return schemas;
};

export default useValidationSchemas;
