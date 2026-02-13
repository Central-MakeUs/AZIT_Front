import * as styles from '@/features/store/styles/StoreDetailInfo.css';

import type { StoreProductDetailResult } from '@/shared/api/models/store';
import { formatPrice } from '@/shared/lib/formatters';

interface StoreDetailInfoProps {
  product: StoreProductDetailResult;
}

export function StoreDetailInfo({ product }: StoreDetailInfoProps) {
  return (
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
  );
}
