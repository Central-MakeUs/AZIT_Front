import type { OrderProduct } from '@/shared/mock/order';
import { Description } from '@azit/design-system';
import * as styles from '../styles/OrderProductItem.css.ts';

interface OrderProductItemProps {
  product: OrderProduct;
  showOriginalPrice?: boolean;
}

export function OrderProductItem({
  product,
  showOriginalPrice = true,
}: OrderProductItemProps) {
  return (
    <div className={styles.productItem}>
      <div className={styles.productImage} />
      <div className={styles.productInfo}>
        <div className={styles.productDetails}>
          <div className={styles.productTexts}>
            <p className={styles.brandName}>{product.brandName}</p>
            <p className={styles.productName}>{product.productName}</p>
          </div>
          <Description>
            <Description.Label>
              <span className={styles.points}>{product.points}</span>
              <span className={styles.quantity}> / {product.quantity}개</span>
            </Description.Label>
            <Description.Value className={styles.priceContainer}>
              {showOriginalPrice && (
                <span className={styles.originalPrice}>
                  {product.originalPrice.toLocaleString()}원
                </span>
              )}
              <span className={styles.discountedPrice}>
                {product.discountedPrice.toLocaleString()}원
              </span>
            </Description.Value>
          </Description>
        </div>
      </div>
    </div>
  );
}
