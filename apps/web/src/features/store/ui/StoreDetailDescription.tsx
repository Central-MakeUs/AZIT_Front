import * as styles from '../styles/StoreDetailDescription.css';

interface StoreDetailDescriptionProps {
  description?: string;
  detailImageUrls?: string[];
}

export function StoreDetailDescription({
  description,
  detailImageUrls,
}: StoreDetailDescriptionProps) {
  const hasContent =
    description || (detailImageUrls && detailImageUrls.length > 0);
  if (!hasContent) return null;

  return (
    <div className={styles.container}>
      <p className={styles.title}>상세정보</p>
      {description && <p className={styles.description}>{description}</p>}
      {detailImageUrls && detailImageUrls.length > 0 && (
        <ul className={styles.list}>
          {detailImageUrls.map((url, index) => (
            <li key={url ?? index} className={styles.listItem}>
              <img
                src={url}
                alt={`상세 ${index + 1}`}
                className={styles.detailImage}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
