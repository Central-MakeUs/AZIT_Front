import { Checkbox, ChevronRightIcon } from '@azit/design-system';
import * as styles from '../styles/TermAgreeItem.css';

export interface TermAgreeItemProps {
  id: string;
  label: string;
  required: boolean;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onDetailClick?: () => void;
}

export function TermAgreeItem({
  id,
  label,
  required,
  checked,
  onCheckedChange,
  onDetailClick,
}: TermAgreeItemProps) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.leftSection}>
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(checked) => onCheckedChange(checked === true)}
        />
        <div className={styles.labelContainer}>
          <span className={styles.label}>{label}</span>
          <span
            className={required ? styles.requiredBadge : styles.optionalBadge}
          >
            ({required ? '필수' : '선택'})
          </span>
        </div>
      </div>
      <button
        type="button"
        className={styles.navigationButton}
        onClick={onDetailClick}
        aria-label={`${label} 상세 보기`}
      >
        <ChevronRightIcon size={20} />
      </button>
    </div>
  );
}
