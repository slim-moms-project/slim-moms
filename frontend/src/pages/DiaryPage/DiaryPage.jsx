import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiary } from '../../redux/diary/diaryOperations';
import { selectDiaryDate } from '../../redux/diary/diarySelectors';
import DiaryDateCalendar from "../../components/DiaryDateCalendar/DiaryDateCalendar";
import DiaryAddProductForm from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../../components/DiaryProductsList/DiaryProductsList";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDiaryDate);

  // Sadece modalın açık/kapalı durumunu tutuyoruz (Ekran boyutunu değil!)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDiary(date));
  }, [dispatch, date]);

  // Form başarıyla gönderildiğinde modalı kapatacak fonksiyon
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className={styles.diaryPageContainer}>

      {/* MOBİL MODAL: Sadece açık olduğunda render edilir */}
      {isAddModalOpen && (
        <div className={styles.mobileModalContainer}>
          <div className={styles.modalHeader}>
            <button
              type="button"
              className={styles.backButton}
              onClick={handleCloseModal}
            >
              ←
            </button>
          </div>
          {/* Modalı kapatma fonksiyonunu forma yolluyoruz */}
          <DiaryAddProductForm closeModal={handleCloseModal} />
        </div>
      )}

      {/* ANA İÇERİK: Mobilde modal açıkken arkaplanı CSS ile gizleyeceğiz */}
      <div className={`${styles.contentWrapper} ${isAddModalOpen ? styles.hideOnMobile : ''}`}>
        <div className={styles.diaryMainContent}>
          <DiaryDateCalendar />

          {/* MASAÜSTÜ FORM: CSS ile sadece tablet ve desktop'ta gösterilecek */}
          <div className={styles.desktopFormWrapper}>
            <DiaryAddProductForm />
          </div>

          <DiaryProductsList />

          {/* MOBİL FLOAT BUTON: CSS ile sadece mobilde gösterilecek */}
          <div className={styles.floatingBtnWrapper}>
            <button
              type="button"
              className={styles.floatingAddButton}
              onClick={() => setIsAddModalOpen(true)}
            >
              +
            </button>
          </div>
        </div>

        <div className={styles.diarySidebar}>
          <RightSideBar />
        </div>
      </div>

    </div>
  );
};

export default DiaryPage;
