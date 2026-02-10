import { Checkbox } from '@azit/design-system/checkbox';
import { useCartContext } from '../context/CartContext';
import * as styles from '../styles/CartSelectionBar.css';

export function CartSelectionBar() {
  const {
    selectedItems,
    allItems,
    isAllSelected,
    handleSelectAll,
    handleDeleteSelected,
  } = useCartContext();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={(checked) => handleSelectAll(checked === true)}
          />
          <div className={styles.selectionText}>
            <span>전체선택</span>
            <span>
              ({selectedItems.length}/{allItems.length})
            </span>
          </div>
        </div>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteSelected}
        >
          선택삭제
        </button>
      </div>
    </>
  );
}
