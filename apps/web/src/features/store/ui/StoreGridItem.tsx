import { useFlow } from '@/app/routes/stackflow';

import type { StoreProductItem } from '@/shared/api/models';
import { formatPrice } from '@/shared/lib/formatters';

import * as styles from '../styles/StoreGridItem.css';

interface StoreGridItemProps {
  product: StoreProductItem;
}

export function StoreGridItem({ product }: StoreGridItemProps) {
  const { push } = useFlow();

  const handleClick = () => {
    push(
      'StoreDetailPage',
      { id: String(product.id ?? '') },
      { animate: true }
    );
  };

  return (
    <button
      className={styles.itemContainer}
      type="button"
      onClick={handleClick}
    >
      <div className={styles.imageWrapper}>
        {product.thumbnailImageUrl && (
          <img
            src={product.thumbnailImageUrl}
            alt={product.productName ?? ''}
            className={styles.thumbnailImage}
          />
        )}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <p className={styles.brandName}>{product.brandName ?? ''}</p>
          <p className={styles.productName}>{product.productName ?? ''}</p>
        </div>
        <div className={styles.priceContainer}>
          <p className={styles.originalPrice}>
            {formatPrice(product.basePrice ?? 0)}
          </p>
          <div className={styles.discountContainer}>
            <p className={styles.discountRate}>{product.discountRate ?? 0}%</p>
            <p className={styles.discountedPrice}>
              {formatPrice(product.salePrice ?? 0)}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
