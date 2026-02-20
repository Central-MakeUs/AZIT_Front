import * as styles from '@/widgets/store/styles/StoreGrid.css';
import { StoreGridItem } from '@/widgets/store/ui/StoreGridItem';

import type { StoreProductItem } from '@/entities/store/model';

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
