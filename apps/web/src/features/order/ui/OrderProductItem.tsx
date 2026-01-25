import type { OrderProduct } from '@/shared/mock/order';
import * as styles from '../styles/OrderProductItem.css';

interface OrderProductItemProps {
  product: OrderProduct;
}

export function OrderProductItem({ product }: OrderProductItemProps) {
  return (
    <div className={styles.productItem}>
      <div className={styles.productImage} />
      <div className={styles.productInfo}>
        <div className={styles.productDetails}>
          <div className={styles.productTexts}>
            <p className={styles.brandName}>{product.brandName}</p>
            <p className={styles.productName}>{product.productName}</p>
          </div>
          <div className={styles.pointsContainer}>
            <p className={styles.points}>{product.points}</p>
            <p className={styles.quantity}>/ {product.quantity}개</p>
          </div>
        </div>
        <div className={styles.priceContainer}>
          <p className={styles.originalPrice}>
            {product.originalPrice.toLocaleString()}원
          </p>
          <p className={styles.discountedPrice}>
            {product.discountedPrice.toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
}
