import * as styles from '../styles/StoreDetailImageSlider.css';

interface StoreDetailImageSliderProps {
  slideImageUrls?: string[];
}

export function StoreDetailImageSlider({
  slideImageUrls,
}: StoreDetailImageSliderProps) {
  const count = slideImageUrls?.length ?? 0;
  const firstImageUrl = slideImageUrls?.[0];

  return (
    <div className={styles.imageContainer}>
      {firstImageUrl ? (
        <img src={firstImageUrl} alt="상품" className={styles.slideImage} />
      ) : null}
      {count > 0 && (
        <div className={styles.imageCounter}>
          <span>1</span>
          <span>/ {count}</span>
        </div>
      )}
    </div>
  );
}
