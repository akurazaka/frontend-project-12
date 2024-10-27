import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { USER } from '../constants';
import ROUTES from '../../app/routes/routes.data';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setUser({ username: null, token: null }));
    localStorage.removeItem(USER);
    navigate(ROUTES.LOGIN);
  };

  return logout;
};

export default useLogout;
