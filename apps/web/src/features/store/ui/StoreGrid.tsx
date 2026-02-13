import type { StoreProductItem } from '@/shared/api/models';

import { StoreGridItem } from './StoreGridItem';
import * as styles from '../styles/StoreGrid.css';

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
