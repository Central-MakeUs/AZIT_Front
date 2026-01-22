import type { StoreProduct } from '@/shared/mock/store';
import { StoreGridItem } from './StoreGridItem';
import * as styles from '../styles/StoreGrid.css';

interface StoreGridProps {
  products: StoreProduct[];
}

export function StoreGrid({ products }: StoreGridProps) {
  return (
    <div className={styles.gridContainer}>
      {products.map((product) => (
        <StoreGridItem key={product.id} product={product} />
      ))}
    </div>
  );
}
