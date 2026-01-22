import * as styles from '../styles/StoreCategoryButton.css';

interface StoreCategoryButtonProps {
  label: string;
}

export function StoreCategoryButton({ label }: StoreCategoryButtonProps) {
  return (
    <button className={styles.categoryButton}>
      <span className={styles.categoryButtonText}>{label}</span>
    </button>
  );
}
