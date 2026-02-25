import { Chip } from '@azit/design-system/chip';

import { RoundProfileImage } from '@/widgets/profile/ui/RoundProfileImage';
import * as styles from '@/widgets/schedule/styles/ScheduleDetailHeaderSection.css';

import {
  MEMBER_ROLE_LABEL,
  ROLE_CHIP_TYPE_MAP,
} from '@/shared/constants/member-role';
import type { RunType } from '@/shared/types/schedule';

import type { MemberRole } from '@/entities/user/model';

interface ScheduleDetailHeaderSectionProps {
  runType: RunType;
  distance: string;
  pace: string;
  title: string;
  creatorName: string;
  creatorProfileImageUrl?: string;
  creatorRole: MemberRole;
}

export function ScheduleDetailHeaderSection({
  runType,
  distance,
  pace,
  title,
  creatorName,
  creatorProfileImageUrl,
  creatorRole,
}: ScheduleDetailHeaderSectionProps) {
  console.log(creatorRole);
  return (
    <div className={styles.section}>
      <div className={styles.tagRow}>
        <Chip type={runType === 'REGULAR' ? 'primary' : 'secondary'}>
          {runType}
        </Chip>
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
          <Chip type={ROLE_CHIP_TYPE_MAP[creatorRole]}>
            {MEMBER_ROLE_LABEL[creatorRole]}
          </Chip>
        </div>
      </div>
    </div>
  );
}
