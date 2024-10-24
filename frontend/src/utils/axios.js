import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/userSlice';
import { selectUserData } from '../store/userSlice';

const useInstance = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userData = useSelector(selectUserData);
  const instance = axios.create({
    baseURL: '/api/v1',
    timeout: 5000,
  });

  const newInstance = async (request) => {
    const authHeaders = userData
      ? { Authorization: `Bearer ${userData.token}` }
      : {};

    try {
      return await instance({
        ...request,
        headers: { ...authHeaders, ...request.headers },
      });
    } catch (error) {
      if (!error.isAxiosError) {
        toast.error(t('unknownError'), {
          position: 'top-right',
        });
        return Promise.reject(error);
      }

      const { status } = error.response;
      if (status === 401) {
        toast.error(t('unauthorizedAccess'), {
          position: 'top-right',
        });
        localStorage.removeItem('user_data');
        dispatch(logOut());
      }

      return Promise.reject(error);
    }
  };

  return newInstance;
};

export default useInstance;
