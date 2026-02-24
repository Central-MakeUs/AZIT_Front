import { Chip } from '@azit/design-system/chip';

import * as styles from '@/widgets/schedule-form/styles/ChipButton.css';

export type ChipButtonVariant = 'primary' | 'secondary';

export interface ChipButtonProps {
  variant: ChipButtonVariant;
  selected: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

type ChipTypeForButton = 'primary' | 'secondary' | 'gray';

const getChipType = (
  variant: ChipButtonVariant,
  selected: boolean
): ChipTypeForButton => {
  return selected ? variant : 'gray';
};

export function ChipButton({
  variant,
  selected,
  onClick,
  children,
  className,
}: ChipButtonProps) {
  const chipType = getChipType(variant, selected);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className={styles.chipWrapper}>
        <Chip type={chipType} className={className}>
          {children}
        </Chip>
      </span>
    </button>
  );
}
