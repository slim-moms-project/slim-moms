import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { calculateDailyCalories } from '../../redux/calculator/calculatorOperations';
import styles from './DailyCaloriesForm.module.css';

const DailyCaloriesForm = ({ openModal }) => {
  const dispatch = useDispatch();

  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [bloodType, setBloodType] = useState('1');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      height: Number(height),
      age: Number(age),
      currentWeight: Number(currentWeight),
      desiredWeight: Number(desiredWeight),
      bloodType: Number(bloodType),
    };

    try {
      await dispatch(calculateDailyCalories(formData)).unwrap();

      // İşlem başarılı olursa modalı aç
      if (openModal) {
        openModal();
      }
    } catch {
      //Error toast is handled in the async operation.
    }
  };

  return (
    <div className={styles.calculatorFormContainer}>
      <h2 className={styles.calculatorTitle}>
        Hemen kilo vermek için günlük kalori ihtiyacınızı hesaplayın
      </h2>

      <form className={styles.calculatorForm} onSubmit={handleSubmit}>
        <div className={styles.formInputsWrapper}>
          {/* Sol Kolon */}
          <div className={styles.inputColumn}>
            <div className={styles.inputGroup}>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="height">Boy *</label>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="age">Yaş *</label>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="number"
                id="currentWeight"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="currentWeight">Mevcut Kilo *</label>
            </div>
          </div>

          {/* Sağ Kolon */}
          <div className={styles.inputColumn}>
            <div className={styles.inputGroup}>
              <input
                type="number"
                id="desiredWeight"
                value={desiredWeight}
                onChange={(e) => setDesiredWeight(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="desiredWeight">Hedef Kilo *</label>
            </div>

            {/* Kan Grubu Seçimi */}
            <div className={styles.radioGroupWrapper}>
              <p className={styles.radioTitle}>Kan Grubu *</p>
              <div className={styles.radioGroup}>
                {[1, 2, 3, 4].map((type) => (
                  <label key={type} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="bloodType"
                      value={type}
                      checked={bloodType === String(type)}
                      onChange={(e) => setBloodType(e.target.value)}
                    />
                    <span className={styles.customRadio}></span>
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Hesapla
        </button>
      </form>
    </div>
  );
};

export default DailyCaloriesForm;
