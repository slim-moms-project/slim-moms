import RightSideBar from '../../components/RightSideBar/RightSideBar';
import CalculatorCalorieForm from '../../components/CalculatorCalorieForm/CalculatorCalorieForm';
import css from './CalculatorPage.module.css';

const CalculatorPage = () => {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.formSection}>
          <h1 className={css.title}>
            Calculate your daily calorie intake right now
          </h1>
          <CalculatorCalorieForm />
        </div>
        <div className={css.resultSection}>
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
