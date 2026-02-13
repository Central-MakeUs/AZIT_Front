import * as styles from '@/shared/ui/layout/AppLayout.css';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.appLayout}>{children}</div>;
}
