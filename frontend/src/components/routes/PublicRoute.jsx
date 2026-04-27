import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectAuthToken,
  selectIsLoggedIn,
} from '../../redux/auth/authSelectors.js';

const PublicRoute = ({ component: Component, redirectTo = '/diary' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectAuthToken);

  return isLoggedIn || token ? (
    <Navigate to={redirectTo} replace />
  ) : (
    Component
  );
};

export default PublicRoute;
