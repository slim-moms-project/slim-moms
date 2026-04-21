import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors.js';

const PublicRoute = ({ component: Component, redirectTo = '/diary' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default PublicRoute;
