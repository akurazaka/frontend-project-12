import { setUser } from '../../../../../redux/slices/userSlice';
import { USER } from '../../../../../shared/constants';
import ROUTES from '../../../../../app/routes/routes.data';

const handleSubmit = async (
  { username, password },
  { setSubmitting },
  signup,
  setError,
  dispatch,
  navigate,
  t,
) => {
  setError('');
  try {
    const response = await signup({ username, password });
    if (response.error) {
      throw new Error('Conflict');
    }
    const { data } = response;
    if (data) {
      const user = JSON.stringify(data);
      localStorage.setItem(USER, user);
      dispatch(setUser(data));
      navigate(ROUTES.HOME);
    }
  } catch (error) {
    if (error.message === 'Conflict') {
      setError(t('userExist'));
    } else {
      setError(t('signUpError'));
    }
  } finally {
    setSubmitting(false);
  }
};

export default handleSubmit;
