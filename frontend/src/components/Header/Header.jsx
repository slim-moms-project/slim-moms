import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  selectAuthToken,
  selectIsLoggedIn,
} from '../../redux/auth/authSelectors.js';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import UserInfo from '../UserInfo/UserInfo';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectAuthToken);
  const isAuthenticated = isLoggedIn || token;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const mobileLinks = isAuthenticated
    ? [
        { to: '/diary', label: 'DIARY' },
        { to: '/calculator', label: 'CALCULATOR' },
      ]
    : [
        { to: '/login', label: 'LOG IN' },
        { to: '/register', label: 'REGISTRATION' },
      ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>

        <div className={styles.desktopNav}>
          <div className={styles.separator}></div>
          <Navigation />
        </div>

        <div className={styles.headerRight}>
          {isAuthenticated && (
            <div className={styles.desktopUserInfoWrapper}>
              <UserInfo />
            </div>
          )}
          <button className={styles.menuToggleBtn} onClick={toggleMenu}>
            {isMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 18H21"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isAuthenticated && (
        <div className={styles.userInfoWrapper}>
          <UserInfo />
        </div>
      )}

      {isMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <nav className={styles.mobileNavLinks}>
            {mobileLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={styles.mobileLink}
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
