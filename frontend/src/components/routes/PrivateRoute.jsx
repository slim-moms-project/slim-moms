import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectAuthToken,
  selectIsLoggedIn,
} from '../../redux/auth/authSelectors';

const PrivateRoute = ({ component: Component, redirectTo = '/login' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectAuthToken);

  return isLoggedIn || token ? Component : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
