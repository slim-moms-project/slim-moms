// frontend/src/components/Navigation/Navigation.jsx
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectAuthToken,
  selectIsLoggedIn,
} from '../../redux/auth/authSelectors.js';
import styles from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectAuthToken);
  const isAuthenticated = isLoggedIn || token;

  const links = isAuthenticated
    ? [
        { to: '/diary', label: 'Diary' },
        { to: '/calculator', label: 'Calculator' },
      ]
    : [
        { to: '/login', label: 'Log in' },
        { to: '/register', label: 'Registration' },
      ];

  return (
    <nav className={styles.navContainer}>
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
