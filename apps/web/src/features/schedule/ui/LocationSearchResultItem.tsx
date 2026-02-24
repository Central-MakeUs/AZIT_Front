import { Divider } from '@azit/design-system/divider';

import * as styles from '@/features/schedule/styles/LocationSearchResultItem.css';

interface LocationSearchResultItemProps {
  name: string;
  keyword: string;
  category: string;
  address: string;
  isLast?: boolean;
  onClick: () => void;
}

export function LocationSearchResultItem({
  name,
  keyword,
  category,
  address,
  isLast = false,
  onClick,
}: LocationSearchResultItemProps) {
  const renderHighlightedName = () => {
    if (!keyword) return <span className={styles.nameSuffix}>{name}</span>;

    const regex = new RegExp(`(${keyword})`, 'i');
    const parts = name.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className={styles.keyword}>
          {part}
        </span>
      ) : (
        <span key={index} className={styles.nameSuffix}>
          {part}
        </span>
      )
    );
  };

  return (
    <div className={styles.item} onClick={onClick} role="button" tabIndex={0}>
      <div className={styles.content}>
        <div className={styles.nameRow}>
          <span className={styles.nameWrapper}>{renderHighlightedName()}</span>
          <span className={styles.category}>{category}</span>
        </div>
        <span className={styles.address}>{address}</span>
      </div>
      {!isLast && <Divider />}
    </div>
  );
}
