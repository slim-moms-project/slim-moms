// frontend/src/components/DiaryDateCalendar/DiaryDateCalendar.jsx
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../redux/diary/diarySlice';
import { fetchDiary } from '../../redux/diary/diaryOperations';
import { selectDiaryDate } from '../../redux/diary/diarySelectors';

// 1. DÜZELTME: CSS Module'ü doğru şekilde import ediyoruz
import styles from './DiaryDateCalendar.module.css';

// Takvim İkonu (Tasarıma uygun basit bir SVG)
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2H15V0H13V2H7V0H5V2H4C2.89543 2 2 2.89543 2 4V18C2 19.1046 2.89543 20 4 20H16C17.1046 20 18 19.1046 18 18V4C18 2.89543 17.1046 2 16 2ZM16 18H4V7H16V18Z" fill="#9B9FAA"/>
  </svg>
);

const DiaryDateCalendar = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector(selectDiaryDate);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    if (newDate) {
      dispatch(setDate(newDate));
      dispatch(fetchDiary(newDate));
    }
  };

  const formattedDate = currentDate
    ? currentDate.split('-').reverse().join('.')
    : new Date().toLocaleDateString('tr-TR').replace(/\//g, '.');

  return (
    <div className={styles.calendarWrapper}>
      <h2 className={styles.calendarTitle}>{formattedDate}</h2>

      <div className={styles.dateInputContainer}>
         <CalendarIcon />
         <input
           type="date"
           className={styles.hiddenDateInput}
           value={currentDate || ''}
           onChange={handleDateChange}
         />
      </div>
    </div>
  );
};

export default DiaryDateCalendar;
