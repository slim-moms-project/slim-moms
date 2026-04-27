import { useDispatch } from 'react-redux';
import { removeProduct } from '../../redux/diary/diaryOperations';
import styles from './DiaryProductsListItem.module.css';

const DiaryProductsListItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    // 1. Ürün ID'sini alıyoruz
    const productId = item.id || item._id;

    // 2. Gün ID'si yerine objenin içindeki TARİHİ kullanıyoruz!
    const dayId = item.date;

    if (!dayId || !productId) {
      console.error("Silme işlemi için gerekli bilgiler eksik!");
      return;
    }

    // Backend'e tarihi ve ürün ID'sini gönderiyoruz
    dispatch(removeProduct({ dayInfoId: dayId, productId }));
  };

  return (
    <li className={styles.productListItem}>
      {/* Backend düzeltene kadar geçici bir not düşüyoruz */}
      <span className={styles.itemName}>
        {item.title || item.product?.title || "İsimsiz (Backend'den bekleniyor)"}
      </span>
      <span className={styles.itemGrams}>{item.amount} g</span>
      <span className={styles.itemCalories}>{Math.round(item.calories)} kcal</span>
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
