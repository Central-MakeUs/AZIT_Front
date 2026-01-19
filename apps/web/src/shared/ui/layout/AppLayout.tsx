import * as styles from './AppLayout.css';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.appLayout}>{children}</div>;
}
