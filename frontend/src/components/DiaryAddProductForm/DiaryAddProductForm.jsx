import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/diary/diaryOperations';
import { selectDiaryDate } from '../../redux/diary/diarySelectors';
import axiosInstance from '../../services/api/axiosInstance';
import styles from './DiaryAddProductForm.module.css';

const DiaryAddProductForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const date = useSelector(selectDiaryDate);
  const [query, setQuery] = useState('');
  const [grams, setGrams] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (query.length < 2) {
      return;
    }

    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/product?search?q=${encodeURIComponent(query)}`,
        );
        const productsArray = data?.data?.data || data?.data || [];
        setSuggestions(productsArray);
      } catch {
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setQuery(product.title);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct || !grams) return;

    const amountNumber = Number(grams);
    const calculatedCalories = Math.round(
      (selectedProduct.calories / 100) * amountNumber,
    );
    dispatch(
      addProduct({
        date: date,
        productId: selectedProduct._id,
        amount: amountNumber,
        calories: calculatedCalories,
      }),
    );

    setQuery('');
    setGrams('');
    setSelectedProduct(null);

    if (closeModal) {
      closeModal();
    }
  };

  return (
    <form className={styles.diaryForm} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter product name"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            setSelectedProduct(null);
            if (value.length < 2) {
              setSuggestions([]);
            }
          }}
          required
        />
        {/* Arama Sonuçları Dropdown */}
        {suggestions.length > 0 && (
          <ul className={styles.suggestionsDropdown}>
            {suggestions.map((product) => (
              <li
                key={product._id}
                className={styles.suggestionItem}
                onClick={() => handleSelectProduct(product)}
              >
                {product.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <input
          type="number"
          placeholder="Grams"
          className={styles.inputGrams}
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          required
          min="1"
        />
      </div>

      <button
        type="submit"
        className={styles.addBtn}
        disabled={!selectedProduct || !grams}
      >
        <span className={styles.desktopPlus}>+</span>
        <span className={styles.mobileAddText}>Add</span>
      </button>
    </form>
  );
};

export default DiaryAddProductForm;
