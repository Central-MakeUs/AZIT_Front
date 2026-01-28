import type { OrderProduct } from '@/shared/mock/order';
import * as styles from '../styles/OrderProductItem.css.ts';

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
            <div>
              <span className={styles.points}>{product.points}</span>
              <span className={styles.quantity}>/ {product.quantity}개</span>
            </div>
            <div className={styles.priceContainer}>
              <span className={styles.originalPrice}>
                {product.originalPrice.toLocaleString()}원
              </span>
              <span className={styles.discountedPrice}>
                {product.discountedPrice.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
