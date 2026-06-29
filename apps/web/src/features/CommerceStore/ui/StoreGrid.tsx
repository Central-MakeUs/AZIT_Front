import * as styles from '@/features/CommerceStore/styles/StoreGrid.css';

import type { StoreProductItem } from '@/entities/CommerceStore/model';

import { StoreGridItem } from './StoreGridItem';


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
