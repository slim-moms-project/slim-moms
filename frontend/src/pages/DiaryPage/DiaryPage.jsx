import { useState, useEffect } from 'react'; // useState eklendi
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

  // --- YENİ EKLENEN KISIM: Mobil Görünüm Kontrolleri ---
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Ekran boyutu değiştiğinde isMobile durumunu güncelle
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // -----------------------------------------------------

  useEffect(() => {
    dispatch(fetchDiary(date));
  }, [dispatch, date]);

  return (
    <div className={styles.diaryPageContainer}>

      {/* EĞER EKRAN MOBİLSE VE '+' BUTONUNA BASILDIYSA: */}
      {isMobile && isAddModalOpen ? (
        <div className={styles.mobileModalContainer}>
          <div className={styles.modalHeader}>
             {/* Geri dönme butonu */}
            <button
              type="button"
              className={styles.backButton}
              onClick={() => setIsAddModalOpen(false)}
            >
              ←
            </button>
          </div>
          {/* Sadece arama formunu gösteriyoruz */}
          <DiaryAddProductForm />
        </div>
      ) : (

        // EĞER MASAÜSTÜNDEYSEK VEYA MODAL KAPALIYSA (Normal Görünüm):
        <>
          <div className={styles.diaryMainContent}>
            <DiaryDateCalendar />

            {/* Masaüstündeysek formu direkt ekranda göster */}
            {!isMobile && <DiaryAddProductForm />}

            <DiaryProductsList />

            {/* Mobildeysek ve modal kapalıysa ekranın altına '+' butonu koy */}
            {isMobile && (
              <div className={styles.floatingBtnWrapper}>
                <button
                  type="button"
                  className={styles.floatingAddButton}
                  onClick={() => setIsAddModalOpen(true)}
                >
                  +
                </button>
              </div>
            )}
          </div>

          <div className={styles.diarySidebar}>
            <RightSideBar />
          </div>
        </>

      )}
    </div>
  );
};

export default DiaryPage;
