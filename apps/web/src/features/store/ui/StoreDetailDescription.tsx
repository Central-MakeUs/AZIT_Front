import { ChevronDownIcon } from '@azit/design-system/icon';
import { useEffect, useRef, useState } from 'react';

import * as styles from '@/features/store/styles/StoreDetailDescription.css';

interface StoreDetailDescriptionProps {
  description?: string;
  detailImageUrls?: string[];
}

export function StoreDetailDescription({
  description,
  detailImageUrls,
}: StoreDetailDescriptionProps) {
  const firstImageRef = useRef<HTMLImageElement>(null);
  const moreInfoThreshold = 500;
  const hasMeasuredRef = useRef(false);

  const isMoreInfoNotNeeded = () => {
    if (!firstImageRef.current) return false;
    const height = firstImageRef.current.getBoundingClientRect().height;
    return height <= moreInfoThreshold;
  };

  const updateOpenStateByHeight = () => {
    if (hasMeasuredRef.current || !firstImageRef.current) return;
    hasMeasuredRef.current = true;
    setIsMoreInfoOpen(isMoreInfoNotNeeded());
  };

  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);

  const firstImageUrl = detailImageUrls?.[0];
  useEffect(() => {
    hasMeasuredRef.current = false;
  }, [firstImageUrl]);

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
          <li
            key={detailImageUrls[0]}
            className={`${styles.listItem} ${!isMoreInfoOpen ? styles.listItemWithMoreInfo : ''}`}
          >
            <img
              ref={firstImageRef}
              src={detailImageUrls[0]}
              alt="상세 1"
              className={styles.detailImage}
              onLoad={() => requestAnimationFrame(updateOpenStateByHeight)}
            />
            {!isMoreInfoOpen && (
              <button
                className={styles.moreInfoButton}
                onClick={() => setIsMoreInfoOpen(true)}
              >
                상품 정보 더보기 <ChevronDownIcon size={24} color="primary" />
              </button>
            )}
          </li>
          {isMoreInfoOpen &&
            detailImageUrls.slice(1).map((url, index) => (
              <li key={url ?? index} className={styles.listItem}>
                <img
                  src={url}
                  alt={`상세 ${index + 2}`}
                  className={styles.detailImage}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
