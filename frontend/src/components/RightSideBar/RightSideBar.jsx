import { useSelector } from 'react-redux';
import { selectDiaryDate, selectDiarySummary } from '../../redux/diary/diarySelectors';
import { selectNotAllowedProducts } from '../../redux/auth/authSelectors';
import styles from './RightSideBar.module.css';

const RightSideBar = () => {
  const date = useSelector(selectDiaryDate);
  const summary = useSelector(selectDiarySummary);
  const notRecommendedFoods = useSelector(selectNotAllowedProducts) || [];

  const formattedDate = date
    ? date.split('-').reverse().join('.')
    : new Date().toLocaleDateString('tr-TR').replace(/\//g, '.');

  // 1. UYUŞMAZLIK ÇÖZÜLDÜ: Redux'taki totalCalories'i consumed olarak çekiyoruz.
  const consumed = summary?.totalCalories || 0;

  // 2. Günlük İhtiyaç: Henüz hesap makinesi kullanılmadıysa şimdilik 0 gelir.
  const dailyRate = summary?.dailyRate || 0;

  // 3. MATEMATİK: Kalan kalori ve Yüzdelik dilim hesaplanıyor
  // Eğer günlük sınır aşılmışsa eksiye düşmemesi için Math.max kullandık.
  const left = dailyRate > 0 ? Math.max(0, dailyRate - consumed) : 0;
  const nOfNormal = dailyRate > 0 ? Math.round((consumed / dailyRate) * 100) : 0;

  return (
    <aside className={styles.sidebarContainer}>

      {/* 1. BÖLÜM: Günlük Özet */}
      <div className={styles.summarySection}>
        <h3 className={styles.sectionTitle}>Summary for {formattedDate}</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.itemLabel}>Left</span>
            <span className={styles.itemValue}>{Math.round(left)} kcal</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.itemLabel}>Consumed</span>
            <span className={styles.itemValue}>{Math.round(consumed)} kcal</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.itemLabel}>Daily rate</span>
            <span className={styles.itemValue}>{Math.round(dailyRate)} kcal</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.itemLabel}>n% of normal</span>
            <span className={styles.itemValue}>{nOfNormal} %</span>
          </li>
        </ul>
      </div>

      {/* 2. BÖLÜM: Tüketilmemesi Önerilen Besinler */}
      <div className={styles.foodsSection}>
        <h3 className={styles.sectionTitle}>Food not recommended</h3>

        {notRecommendedFoods.length > 0 ? (
          <ul className={styles.foodsList}>
            {notRecommendedFoods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.noFoodsText}>Your diet covers all food groups.</p>
        )}
      </div>

    </aside>
  );
};

export default RightSideBar;
