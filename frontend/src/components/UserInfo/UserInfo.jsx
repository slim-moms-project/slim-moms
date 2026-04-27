// frontend/src/components/UserInfo/UserInfo.jsx
// import { useDispatch, useSelector } from 'react-redux';
// Kendi Redux auth yapına göre güncelle:
// import { logout } from '../../redux/auth/authOperations';
// import { selectUserName } from '../../redux/auth/authSelectors';
import styles from './UserInfo.module.css';

const UserInfo = () => {
 // const dispatch = useDispatch();
  // Geçici olarak "Nic" yazıyoruz, Redux bağlayınca alttaki satırı açarsın
  // const name = useSelector(selectUserName);
  const name = "Nic";

  const handleLogout = () => {
    // dispatch(logout());
    console.log("Çıkış yapıldı");
  };

  return (
    <div className={styles.userInfoContainer}>
      <span className={styles.userName}>{name}</span>
      <div className={styles.divider}></div>
      <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
        Exit
      </button>
    </div>
  );
};

export default UserInfo;
