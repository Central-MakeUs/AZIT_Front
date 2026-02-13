import { ChevronLeftIcon } from '@azit/design-system/icon';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/shared/ui/button/BackButton.css';

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: number;
}

export function BackButton({ onClick, ...props }: BackButtonProps) {
  const { pop } = useFlow();
  const goBack = () => {
    pop();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      goBack();
    }
  };

  return (
    <button
      type="button"
      className={styles.backButton}
      onClick={handleClick}
      {...props}
    >
      <ChevronLeftIcon size={24} />
    </button>
  );
}
