import clsx from 'clsx';
import * as styles from './Divider.css';

export function Divider({ className }: { className?: string }) {
  return <div className={clsx(styles.divider, className)} />;
}
