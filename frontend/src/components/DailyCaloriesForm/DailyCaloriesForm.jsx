// frontend/src/components/DailyCaloriesForm/DailyCaloriesForm.jsx
import { useState } from 'react';
//import { useDispatch } from 'react-redux';
//Kendi redux yapına göre aşağıdaki importu güncelle
//import { calculateDailyRate } from '../../redux/calculator/calculatorOperations';
import './DailyCaloriesForm.module.css';

const DailyCaloriesForm = ({ openModal }) => {
  // const dispatch = useDispatch(); //

  // Form State'leri
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [bloodType, setBloodType] = useState('1'); // Varsayılan kan grubu: 1

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      height: Number(height),
      age: Number(age),
      weight: Number(currentWeight),
      desiredWeight: Number(desiredWeight),
      bloodType: Number(bloodType),
    };

    // 2. Linter hatasını önlemek ve veriyi görmek için formData'yı konsola yazdırıyoruz
  console.log('Backend e gidecek veri:', formData);

    try {
      // Backend'e verileri gönder (Kendi thunk fonksiyonunu buraya yaz)
      // const result = await dispatch(calculateDailyRate(formData)).unwrap();

      // İşlem başarılı olursa modalı aç (Bu fonksiyonu props'tan alıyoruz)
      if (openModal) {
        openModal();
      }
    } catch (error) {
      console.error("Hesaplama sırasında hata oluştu:", error);
    }
  };

  return (
    <div className="calculator-form-container">
      <h2 className="calculator-title">
        Hemen kilo vermek için günlük kalori ihtiyacınızı hesaplayın
      </h2>

      <form className="calculator-form" onSubmit={handleSubmit}>
        <div className="form-inputs-wrapper">
          {/* Sol Kolon */}
          <div className="input-column">
            <div className="input-group">
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

            <div className="input-group">
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

            <div className="input-group">
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
          <div className="input-column">
            <div className="input-group">
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
            <div className="radio-group-wrapper">
              <p className="radio-title">Kan Grubu *</p>
              <div className="radio-group">
                {[1, 2, 3, 4].map((type) => (
                  <label key={type} className="radio-label">
                    <input
                      type="radio"
                      name="bloodType"
                      value={type}
                      checked={bloodType === String(type)}
                      onChange={(e) => setBloodType(e.target.value)}
                    />
                    <span className="custom-radio"></span>
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Hesapla
        </button>
      </form>
    </div>
  );
};

export default DailyCaloriesForm;
