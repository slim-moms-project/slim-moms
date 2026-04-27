import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import UserInfo from '../UserInfo/UserInfo';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>

        {/* Sol Taraf: Logo */}
        <div className={styles.logoContainer}>
          <Logo />
        </div>

        <div className={styles.desktopNav}>
          <div className={styles.separator}></div>
          <Navigation />
        </div>

        {/* Sağ Taraf: Kullanıcı Bilgileri ve Hamburger Menü */}
        <div className={styles.headerRight}>

          <div className={styles.userInfoWrapper}>
            <UserInfo />
          </div>

          {/* Hamburger / Kapat Butonu (Sadece Tablet ve Mobilde Görünür) */}
          <button className={styles.menuToggleBtn} onClick={toggleMenu}>
            {isMenuOpen ? (
              // Menü açıksa X ikonu
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              // Menü kapalıysa Hamburger (3 çizgi) ikonu
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18H21" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* --- TAM EKRAN MOBİL/TABLET MENÜSÜ --- */}
      {isMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <nav className={styles.mobileNavLinks}>
            <NavLink to="/diary" className={styles.mobileLink} onClick={closeMenu}>DIARY</NavLink>
            <NavLink to="/calculator" className={styles.mobileLink} onClick={closeMenu}>CALCULATOR</NavLink>
          </nav>
        </div>
      )}

    </header>
  );
};

export default Header;
