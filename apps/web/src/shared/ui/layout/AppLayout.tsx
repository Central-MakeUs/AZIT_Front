import * as styles from './appLayout.css';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.appLayout}>{children}</div>;
}
