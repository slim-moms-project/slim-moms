import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/authOperations.js';
import { selectUserName } from '../../redux/auth/authSelectors.js';
import styles from './UserInfo.module.css';

const UserInfo = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);

  const handleLogout = () => {
    dispatch(logoutUser());
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
