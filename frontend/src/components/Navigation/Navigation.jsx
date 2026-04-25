// frontend/src/components/Navigation/Navigation.jsx
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.navContainer}>
      <NavLink
        to="/diary"
        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
      >
        Diary
      </NavLink>
      <NavLink
        to="/calculator"
        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
      >
        Calculator
      </NavLink>
    </nav>
  );
};

export default Navigation;
