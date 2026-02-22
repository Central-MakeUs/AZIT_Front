import { Chip } from '@azit/design-system/chip';

import * as styles from '@/widgets/schedule/styles/ScheduleDetailHeaderSection.css';

interface ScheduleDetailHeaderSectionProps {
  runType: string;
  distance: string;
  pace: string;
  title: string;
  creatorName: string;
  isCreatorLeader: boolean;
}

export function ScheduleDetailHeaderSection({
  runType,
  distance,
  pace,
  title,
  creatorName,
  isCreatorLeader,
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
        <div className={styles.creatorInfo}>
          <span className={styles.creatorName}>{creatorName}</span>
          <Chip type="skyblue">리더</Chip>
        </div>
      </div>
    </div>
  );
}
