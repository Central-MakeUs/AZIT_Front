import { Divider } from '@azit/design-system/divider';

import * as styles from '@/features/schedule/styles/LocationSearchResultItem.css';

import { normalizeStr } from '@/shared/lib/formatters';

interface LocationSearchResultItemProps {
  name: string;
  keyword: string;
  address: string;
  isLast?: boolean;
  onClick: () => void;
}

const renderHighlightedName = (name: string, keyword: string) => {
  const normalizedKeyword = normalizeStr(keyword);
  if (!normalizedKeyword)
    return <span className={styles.nameSuffix}>{name}</span>;

  const indexMap: number[] = [];
  for (let i = 0; i < name.length; i++) {
    if (name[i] !== ' ') indexMap.push(i);
  }
  const normalizedName = normalizeStr(name);

  const escapedKeyword = normalizedKeyword.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );
  const regex = new RegExp(escapedKeyword, 'gi');

  const highlights: [number, number][] = [];
  let match;
  while ((match = regex.exec(normalizedName)) !== null) {
    const origStart = indexMap[match.index];
    const origEnd = indexMap[match.index + match[0].length - 1];
    highlights.push([origStart, origEnd + 1]);
  }

  if (highlights.length === 0)
    return <span className={styles.nameSuffix}>{name}</span>;

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const [start, end] of highlights) {
    if (cursor < start) {
      parts.push(
        <span key={`s-${cursor}`} className={styles.nameSuffix}>
          {name.slice(cursor, start)}
        </span>
      );
    }
    parts.push(
      <span key={`k-${start}`} className={styles.keyword}>
        {name.slice(start, end)}
      </span>
    );
    cursor = end;
  }
  if (cursor < name.length) {
    parts.push(
      <span key={`s-${cursor}`} className={styles.nameSuffix}>
        {name.slice(cursor)}
      </span>
    );
  }
  return parts;
};

export function LocationSearchResultItem({
  name,
  keyword,
  address,
  isLast = false,
  onClick,
}: LocationSearchResultItemProps) {
  return (
    <div className={styles.item} onClick={onClick} role="button" tabIndex={0}>
      <div className={styles.content}>
        <div className={styles.nameRow}>
          <span className={styles.nameWrapper}>
            {renderHighlightedName(name, keyword)}
          </span>
        </div>
        <span className={styles.address}>{address}</span>
      </div>
      {!isLast && <Divider />}
    </div>
  );
}
