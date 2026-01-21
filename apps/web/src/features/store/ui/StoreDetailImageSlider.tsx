import * as styles from '../styles/StoreDetailImageSlider.css';

export function StoreDetailImageSlider() {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.imageCounter}>
        <p>1</p>
        <p>/ 6</p>
      </div>
    </div>
  );
}
