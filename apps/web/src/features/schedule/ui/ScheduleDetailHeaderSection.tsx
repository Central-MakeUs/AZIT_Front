import { Chip } from '@azit/design-system/chip';

import * as styles from '@/features/schedule/styles/ScheduleDetailHeaderSection.css';

interface ScheduleDetailHeaderSectionProps {
  runType: string;
  distance: string;
  pace: string;
  title: string;
  leaderNickname: string;
}

export function ScheduleDetailHeaderSection({
  runType,
  distance,
  pace,
  title,
  leaderNickname,
}: ScheduleDetailHeaderSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.tagRow}>
        <Chip type="primary">{runType}</Chip>
        <Chip type="gray">{distance}</Chip>
        <Chip type="gray">{pace}</Chip>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.leaderRow}>
        <div className={styles.avatar} />
        <div className={styles.leaderInfo}>
          <span className={styles.leaderNickname}>{leaderNickname}</span>
          <Chip type="skyblue">리더</Chip>
        </div>
      </div>
    </div>
  );
}
