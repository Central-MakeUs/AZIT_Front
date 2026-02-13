import type { ReactNode } from 'react';

import * as styles from '../styles/ScheduleSectionLayout.css';

interface ScheduleSectionLayoutProps {
  topSection?: ReactNode;
  scheduleTitle?: string;
  scheduleContent: ReactNode;
}

export function ScheduleSectionLayout({
  topSection,
  scheduleTitle,
  scheduleContent,
}: ScheduleSectionLayoutProps) {
  return (
    <div className={styles.pageContainer}>
      {topSection && <div className={styles.topSection}>{topSection}</div>}
      <div className={styles.scheduleSection}>
        {scheduleTitle && (
          <h2 className={styles.sectionTitle}>{scheduleTitle}</h2>
        )}
        {scheduleContent}
      </div>
    </div>
  );
}
