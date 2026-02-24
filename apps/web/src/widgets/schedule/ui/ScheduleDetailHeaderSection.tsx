import { Chip } from '@azit/design-system/chip';

import { RoundProfileImage } from '@/widgets/profile/ui/RoundProfileImage';
import * as styles from '@/widgets/schedule/styles/ScheduleDetailHeaderSection.css';

interface ScheduleDetailHeaderSectionProps {
  runType: string;
  distance: string;
  pace: string;
  title: string;
  creatorName: string;
  creatorProfileImageUrl?: string;
  isCreatorLeader: boolean;
}

export function ScheduleDetailHeaderSection({
  runType,
  distance,
  pace,
  title,
  creatorName,
  creatorProfileImageUrl,
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
        <RoundProfileImage
          src={creatorProfileImageUrl}
          alt={creatorName}
          size={36}
        />
        <div className={styles.creatorInfo}>
          <span className={styles.creatorName}>{creatorName}</span>
          {isCreatorLeader && <Chip type="skyblue">리더</Chip>}
        </div>
      </div>
    </div>
  );
}
