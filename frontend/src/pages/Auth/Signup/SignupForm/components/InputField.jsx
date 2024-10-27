import { Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';

const InputField = ({
  name, type, placeholder, label,
}) => {
  const { t } = useTranslation();

  return (
    <div className="form-floating mb-3">
      <Field
        placeholder={placeholder}
        name={name}
        required=""
        autoComplete={name}
        type={type}
        id={name}
        className="form-control"
      />
      <label className="form-label" htmlFor={name}>
        {t(label)}
      </label>
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

export default InputField;
