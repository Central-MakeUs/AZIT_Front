import { formatPrice } from '@/shared/lib/formatters';
import type { StoreProduct } from '@/shared/mock/store';
import * as styles from '../styles/StoreGridItem.css';

interface StoreGridItemProps {
  product: StoreProduct;
}

export function StoreGridItem({ product }: StoreGridItemProps) {
  return (
    <button className={styles.itemContainer} type="button">
      <div className={styles.imageWrapper} />
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <p className={styles.brandName}>{product.brandName}</p>
          <p className={styles.productName}>{product.productName}</p>
        </div>
        <div className={styles.priceContainer}>
          <p className={styles.originalPrice}>
            {formatPrice(product.originalPrice)}
          </p>
          <div className={styles.discountContainer}>
            <p className={styles.discountRate}>{product.discountRate}%</p>
            <p className={styles.discountedPrice}>
              {formatPrice(product.discountedPrice)}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
