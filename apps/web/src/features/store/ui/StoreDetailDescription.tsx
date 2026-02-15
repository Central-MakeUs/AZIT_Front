import { ChevronDownIcon } from '@azit/design-system/icon';
import { useState } from 'react';

import * as styles from '@/features/store/styles/StoreDetailDescription.css';

interface StoreDetailDescriptionProps {
  description?: string;
  detailImageUrls?: string[];
}

export function StoreDetailDescription({
  description,
  detailImageUrls,
}: StoreDetailDescriptionProps) {
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);

  const hasContent =
    description || (detailImageUrls && detailImageUrls.length > 0);
  if (!hasContent) return null;

  return (
    <div className={styles.container}>
      <p className={styles.title}>상세정보</p>
      {description && (
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      {detailImageUrls && detailImageUrls.length > 0 && (
        <ul className={styles.list}>
          {detailImageUrls.map((url, index) => (
            <li key={url ?? index} className={styles.listItem}>
              {index === 0 && (
                <img
                  src={url}
                  alt={`상세 ${index + 1}`}
                  className={styles.detailImage}
                />
              )}

              {index > 0 && isMoreInfoOpen && (
                <img
                  src={url}
                  alt={`상세 ${index + 1}`}
                  className={styles.detailImage}
                />
              )}

              {index === 0 && !isMoreInfoOpen && (
                <button
                  className={styles.moreInfoButton}
                  onClick={() => setIsMoreInfoOpen(true)}
                >
                  상품 정보 더보기 <ChevronDownIcon size={24} color="primary" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
