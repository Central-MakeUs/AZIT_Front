import { useState, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@azit/design-system/icon';
import * as styles from '../styles/StoreDetailImageSlider.css';

const SWIPE_THRESHOLD = 50;

interface StoreDetailImageSliderProps {
  slideImageUrls?: string[];
}

export function StoreDetailImageSlider({
  slideImageUrls,
}: StoreDetailImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const count = slideImageUrls?.length ?? 0;
  const hasMultiple = count > 1;

  const goPrev = useCallback(() => {
    if (!hasMultiple) return;
    setCurrentIndex((i) => (i === 0 ? count - 1 : i - 1));
  }, [count, hasMultiple]);

  const goNext = useCallback(() => {
    if (!hasMultiple) return;
    setCurrentIndex((i) => (i === count - 1 ? 0 : i + 1));
  }, [count, hasMultiple]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX == null || !hasMultiple) return;
      const touchEndX = e.changedTouches[0].clientX;
      const delta = touchStartX - touchEndX;
      if (delta > SWIPE_THRESHOLD) goNext();
      else if (delta < -SWIPE_THRESHOLD) goPrev();
      setTouchStartX(null);
    },
    [touchStartX, hasMultiple, goNext, goPrev]
  );

  if (count === 0) {
    return <div className={styles.imageContainer} />;
  }

  const trackStyle = {
    width: `${count * 100}vw`,
    transform: `translateX(-${currentIndex * 100}vw)`,
  };

  return (
    <div
      className={styles.imageContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.track} style={trackStyle}>
        {slideImageUrls!.map((url, index) => (
          <div key={url ?? index} className={styles.slide}>
            <img
              src={url}
              alt={`상품 ${index + 1}`}
              className={styles.slideImage}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* {hasMultiple && (
        <>
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={goPrev}
            aria-label="이전 이미지"
          >
            <ChevronLeftIcon size={24} />
          </button>
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={goNext}
            aria-label="다음 이미지"
          >
            <ChevronRightIcon size={24} />
          </button>
        </>
      )} */}

      <div className={styles.bottomArea}>
        <div className={styles.imageCounter}>
          <span>{currentIndex + 1}</span>
          <span>/ {count}</span>
        </div>
        {/* {hasMultiple && (
          <div className={styles.dots} role="tablist" aria-label="슬라이드">
            {slideImageUrls!.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`${index + 1}번째 이미지`}
                className={index === currentIndex ? `${styles.dot} ${styles.dotActive}` : styles.dot}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}
