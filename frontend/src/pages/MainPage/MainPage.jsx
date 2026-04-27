import { useState } from 'react';
import { useSelector } from 'react-redux';
import DailyCaloriesForm from '../../components/DailyCaloriesForm/DailyCaloriesForm';
import DailyCalorieIntake from '../../components/DailyCalorieIntake/DailyCalorieIntake';
import Modal from '../../components/Modal/Modal';
import { selectDailyRate, selectNotAllowedProducts } from '../../redux/calculator/calculatorSelectors';
import styles from './MainPage.module.css';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dailyRate = useSelector(selectDailyRate);
  const notAllowedProducts = useSelector(selectNotAllowedProducts);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>

        <DailyCaloriesForm openModal={handleOpenModal} />

      </div>

      {isModalOpen && dailyRate && (
        <Modal onClose={handleCloseModal}>
          <DailyCalorieIntake
            dailyRate={dailyRate}
            notRecommendedFoods={notAllowedProducts}
            closeModal={handleCloseModal}
          />
        </Modal>
      )}
    </main>
  );
};

export default MainPage;
