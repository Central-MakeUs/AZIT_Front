import * as styles from '@/widgets/mypage/styles/MypageStatCard.css';

interface MypageStatCardProps {
  label: string;
  value: string | number;
}

export function MypageStatCard({ label, value }: MypageStatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
