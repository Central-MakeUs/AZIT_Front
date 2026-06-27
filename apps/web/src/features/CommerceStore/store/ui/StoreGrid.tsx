import * as styles from '@/features/CommerceStore/store/styles/StoreGrid.css';
import { StoreGridItem } from '@/features/CommerceStore/store/ui/StoreGridItem';

import type { StoreProductItem } from '@/entities/CommerceStore/model';

interface StoreGridProps {
  products: StoreProductItem[];
}

export function StoreGrid({ products }: StoreGridProps) {
  return (
    <div className={styles.gridContainer}>
      {products.map((product, index) => (
        <StoreGridItem
          key={product.id ?? `product-${index}`}
          product={product}
        />
      ))}
    </div>
  );
}
