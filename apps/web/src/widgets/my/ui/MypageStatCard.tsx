import type { ReactNode } from 'react';

import * as styles from '@/widgets/my/styles/MypageStatCard.css';

interface MypageStatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

export function MypageStatCard({ icon, label, value }: MypageStatCardProps) {
  return (
    <div className={styles.card}>
      {icon}
      <div className={styles.label}>{label}</div>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
