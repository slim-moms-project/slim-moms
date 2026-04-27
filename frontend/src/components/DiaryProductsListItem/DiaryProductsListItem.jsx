import { useDispatch } from 'react-redux';
import { removeProduct } from '../../redux/diary/diaryOperations';
import styles from './DiaryProductsListItem.module.css';

const DiaryProductsListItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const diaryEntryId = item._id || item.id;

    if (!diaryEntryId) {
      return;
    }

    dispatch(removeProduct({ productId: diaryEntryId }));
  };

  return (
    <li className={styles.productListItem}>
      <span className={styles.itemName}>
        {item.title || item.product?.title || 'Unnamed product'}
      </span>
      <span className={styles.itemGrams}>{item.amount} g</span>
      <span className={styles.itemCalories}>
        {Math.round(item.calories)} kcal
      </span>
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={handleDelete}
        aria-label="Delete product"
      >
        ✕
      </button>
    </li>
  );
};

export default DiaryProductsListItem;
