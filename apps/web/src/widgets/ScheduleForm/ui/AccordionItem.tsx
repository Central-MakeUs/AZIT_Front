import { CheckIcon } from '@azit/design-system/icon';
import { memo } from 'react';

import * as styles from '@/widgets/ScheduleForm/styles/ScheduleForm.css';

export interface AccordionItemProps {
  icon: React.ReactNode;
  label: string;
  filled: boolean;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const AccordionItem = memo(function AccordionItem({
  icon,
  label,
  filled,
  open,
  onToggle,
  children,
}: AccordionItemProps) {
  return (
    <div className={styles.accordionItem}>
      <button
        type="button"
        className={styles.accordionHeader}
        onClick={onToggle}
      >
        <span className={styles.accordionLeftGroup}>
          <span>{icon}</span>
          <span className={styles.accordionLabel}>{label}</span>
        </span>
        <CheckIcon size={20} color={filled ? 'primary' : 'secondary'} />
      </button>
      {open && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
});
