import { ChevronDownIcon } from '@azit/design-system/icon';
import { useEffect, useRef, useState } from 'react';

import * as styles from '@/features/store/styles/StoreDetailDescription.css';

const MORE_INFO_HEIGHT_THRESHOLD = 500;

interface StoreDetailDescriptionProps {
  description?: string;
  detailImageUrls?: string[];
}

export function StoreDetailDescription({
  description,
  detailImageUrls,
}: StoreDetailDescriptionProps) {
  const imageListRef = useRef<HTMLUListElement>(null);
  const hasMeasuredRef = useRef(false);

  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(true);

  const firstImageUrl = detailImageUrls?.[0];
  useEffect(() => {
    hasMeasuredRef.current = false;
  }, [firstImageUrl]);

  useEffect(() => {
    const listEl = imageListRef.current;
    if (!listEl || !detailImageUrls?.length) return;

    const checkHeight = () => {
      if (hasMeasuredRef.current) return;
      const height = listEl.getBoundingClientRect().height;
      if (height > MORE_INFO_HEIGHT_THRESHOLD) {
        hasMeasuredRef.current = true;
        setIsMoreInfoOpen(false);
      }
    };

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(checkHeight);
    });
    observer.observe(listEl);
    requestAnimationFrame(checkHeight);

    return () => observer.disconnect();
  }, [detailImageUrls, firstImageUrl]);

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
        <ul ref={imageListRef} className={styles.list}>
          <li
            key={detailImageUrls[0]}
            className={`${styles.listItem} ${!isMoreInfoOpen ? styles.listItemWithMoreInfo : ''}`}
          >
            <img
              src={detailImageUrls[0]}
              alt="상세 1"
              className={styles.detailImage}
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
