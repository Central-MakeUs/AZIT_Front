import type { StoreProduct } from '@/shared/mock/store';
import * as styles from '../styles/StoreDetailDescription.css';

interface StoreDetailDescriptionProps {
  details: StoreProduct['details'];
}

export function StoreDetailDescription({
  details,
}: StoreDetailDescriptionProps) {
  if (!details || details.length === 0) return null;

  return (
    <div className={styles.container}>
      <p className={styles.title}>상세정보</p>
      <ul className={styles.list}>
        {details.map((detail, index) => (
          <li key={index} className={styles.listItem}>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
