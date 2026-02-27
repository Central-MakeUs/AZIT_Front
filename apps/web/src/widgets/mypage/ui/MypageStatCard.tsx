import type { ReactNode } from 'react';

import * as styles from '@/widgets/mypage/styles/MypageStatCard.css';

interface MypageStatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

export function MypageStatCard({ label, value, icon }: MypageStatCardProps) {
  return (
    <div className={styles.card}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.label}>{label}</div>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
