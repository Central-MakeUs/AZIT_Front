import * as styles from '@/features/store/styles/StoreGrid.css';
import { StoreGridItem } from '@/features/store/ui/StoreGridItem';

import type { StoreProductItem } from '@/shared/api/models/store';

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
