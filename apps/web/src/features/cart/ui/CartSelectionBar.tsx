import { Checkbox } from '@azit/design-system/checkbox';
import * as styles from '../styles/CartSelectionBar.css';

interface CartSelectionBarProps {
  selectedCount: number;
  totalCount: number;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  onDeleteSelected: () => void;
}

export function CartSelectionBar({
  selectedCount,
  totalCount,
  isAllSelected,
  onSelectAll,
  onDeleteSelected,
}: CartSelectionBarProps) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={(checked) => onSelectAll(checked === true)}
          />
          <div className={styles.selectionText}>
            <span>전체선택</span>
            <span>
              ({selectedCount}/{totalCount})
            </span>
          </div>
        </div>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={onDeleteSelected}
        >
          선택삭제
        </button>
      </div>
    </>
  );
}
