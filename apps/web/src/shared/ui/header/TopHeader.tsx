import { type HeaderProps, Header } from '@azit/design-system';
import { clsx } from 'clsx';
import * as styles from './topHeader.css';

interface TopHeaderProps extends HeaderProps {
  className?: string;
}

export function TopHeader({ className, ...props }: TopHeaderProps) {
  return (
    <div className={clsx(styles.topHeader, className)}>
      <Header {...props} />
    </div>
  );
}
