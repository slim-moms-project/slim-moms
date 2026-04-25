import { useSelector } from 'react-redux';
import CalculatorCalorieForm from '../../components/CalculatorCalorieForm/CalculatorCalorieForm';
import {
  selectCalculatorResult,
  selectCalculatorIsLoading,
} from '../../redux/calculator/calculatorSelectors';
import css from './CalculatorPage.module.css';

const CalculatorPage = () => {
  const result = useSelector(selectCalculatorResult);
  const { dailyCalories, notRecommended } = result;
  const isLoading = useSelector(selectCalculatorIsLoading);
  const hasResult = Boolean(dailyCalories);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>

        {/* LEFT */}
        <div className={css.formSection}>
          <h1 className={css.title}>
            Calculate your daily calorie intake right now
          </h1>
          <CalculatorCalorieForm />
        </div>

        {/* RIGHT */}
        <div className={css.resultSection}>

          {isLoading && (
            <p className={css.placeholder}>Calculating...</p>
          )}

          {!isLoading && hasResult && (
            <div className={css.resultContent}>
              <p className={css.resultLabel}>
                Your daily calorie intake is:
              </p>
              <p className={css.resultValue}>
                {dailyCalories} kcal
              </p>
              {notRecommended?.length > 0 && (
                <div className={css.notRecommendedSection}>
                  <p className={css.notRecommendedTitle}>
                    Food not recommended
                  </p>
                  <ul className={css.notRecommendedList}>
                    {notRecommended.map((product) => (
                      <li key={product} className={css.notRecommendedItem}>
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!isLoading && !hasResult && (
            <p className={css.placeholder}>
              Your diet will be displayed here
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;