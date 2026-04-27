import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import styles from './DailyCalorieIntake.module.css';

const DailyCalorieIntake = ({ dailyRate = 0, notRecommendedFoods = [], closeModal }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleStart = () => {
    if (closeModal) closeModal();

    if (isLoggedIn) {
      navigate('/diary');
    } else {
      navigate('/register');
    }
  };

  return (
    // 2. KRİTİK DÜZELTME: Tüm class'ları dinamik {styles.isim} formatına çevirdik
    <div className={styles.intakeContainer}>
      <h2 className={styles.intakeTitle}>
        Önerilen günlük kalori miktarınız
      </h2>

      <div className={styles.intakeRate}>
        <span className={styles.rateNumber}>{dailyRate}</span>
        <span className={styles.rateUnit}> kcal</span>
      </div>

      <div className={styles.forbiddenFoodsWrapper}>
        <h3 className={styles.forbiddenTitle}>Tüketmemeniz gereken besinler</h3>

        {notRecommendedFoods.length > 0 ? (
          <ol className={styles.forbiddenList}>
            {notRecommendedFoods.map((food, index) => (
              <li key={index} className={styles.forbiddenItem}>{food}</li>
            ))}
          </ol>
        ) : (
          <p className={styles.noForbiddenText}>Diyetiniz tüm besin gruplarını kapsıyor.</p>
        )}
      </div>

      <button type="button" className={styles.startBtn} onClick={handleStart}>
        Kilo vermeye başla
      </button>
    </div>
  );
};

export default DailyCalorieIntake;
