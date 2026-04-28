import { useSelector } from 'react-redux';
import { selectDiaryProducts } from '../../redux/diary/diarySelectors';
import DiaryProductsListItem from '../DiaryProductsListItem/DiaryProductsListItem';
import styles from './DiaryProductsList.module.css';

const DiaryProductsList = () => {
  const products = useSelector(selectDiaryProducts);
  if (!products || products.length === 0) {
    return <p className={styles.emptyListMessage}>Henüz bir ürün eklemediniz.</p>;
  }

  return (
    <ul className={styles.productList}>
      {products.map((item) => (
        <DiaryProductsListItem key={item._id || item.id} item={item} />
      ))}
    </ul>
  );
};

export default DiaryProductsList;
