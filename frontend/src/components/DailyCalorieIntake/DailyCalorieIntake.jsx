import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors'; // Kendi auth selector'ına göre düzelt
import './DailyCalorieIntake.module.css';

const DailyCalorieIntake = ({ dailyRate = 0, notRecommendedFoods = [], closeModal }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleStart = () => {
    // Modal'ı kapat
    if (closeModal) closeModal();

    // Kullanıcı giriş yapmışsa günlüğe, yapmamışsa kayıt sayfasına yönlendir
    if (isLoggedIn) {
      navigate('/diary');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="intake-container">
      <h2 className="intake-title">
        Önerilen günlük kalori miktarınız
      </h2>

      <div className="intake-rate">
        <span className="rate-number">{dailyRate}</span>
        <span className="rate-unit"> kcal</span>
      </div>

      <div className="forbidden-foods-wrapper">
        <h3 className="forbidden-title">Tüketmemeniz gereken besinler</h3>

        {notRecommendedFoods.length > 0 ? (
          <ol className="forbidden-list">
            {notRecommendedFoods.map((food, index) => (
              <li key={index} className="forbidden-item">{food}</li>
            ))}
          </ol>
        ) : (
          <p className="no-forbidden-text">Diyetiniz tüm besin gruplarını kapsıyor.</p>
        )}
      </div>

      <button type="button" className="start-btn" onClick={handleStart}>
        Kilo vermeye başla
      </button>
    </div>
  );
};

export default DailyCalorieIntake;
