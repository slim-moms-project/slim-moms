import { useState } from 'react';
import { useSelector } from 'react-redux';
import DailyCaloriesForm from '../../components/DailyCaloriesForm/DailyCaloriesForm';
import DailyCalorieIntake from '../../components/DailyCalorieIntake/DailyCalorieIntake';
import Modal from '../../components/Modal/Modal';
import { selectCalculatorResult } from '../../redux/calculator/calculatorSelectors';
import styles from './MainPage.module.css';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const result = useSelector(selectCalculatorResult) || {};
  const { dailyCalories, notRecommendedProducts } = result;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>

        <DailyCaloriesForm openModal={handleOpenModal} />

      </div>

      {isModalOpen && dailyCalories && (
        <Modal onClose={handleCloseModal}>
          <DailyCalorieIntake
            dailyRate={dailyCalories}
            notRecommendedFoods={notRecommendedProducts}
            closeModal={handleCloseModal}
          />
        </Modal>
      )}
    </main>
  );
};

export default MainPage;
