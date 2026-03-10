import { Chip } from '@azit/design-system/chip';

import { RoundProfileImage } from '@/widgets/profile/ui/RoundProfileImage';
import * as styles from '@/widgets/schedule/styles/ScheduleDetailHeaderSection.css';

import {
  MEMBER_ROLE_LABEL,
  ROLE_CHIP_TYPE_MAP,
} from '@/shared/constants/member-role';

import type { MemberRole } from '@/entities/user/model';

interface ScheduleDetailHeaderSectionProps {
  runType: string;
  distance: string;
  pace: string;
  title: string;
  creatorName: string | null;
  creatorProfileImageUrl: string;
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
  const runTypeChipType = runType === '정기런' ? 'primary' : 'secondary';
  const name = creatorName ?? '알수 없는 사용자';

  return (
    <div className={styles.section}>
      <div className={styles.tagRow}>
        <Chip type={runTypeChipType}>{runType}</Chip>
        <Chip type="gray">{distance}</Chip>
        <Chip type="gray">{pace}</Chip>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.leaderRow}>
        <RoundProfileImage src={creatorProfileImageUrl} alt={name} size={36} />
        <div className={styles.creatorInfo}>
          <span className={styles.creatorName}>{name}</span>
          <Chip type={ROLE_CHIP_TYPE_MAP[creatorRole]}>
            {MEMBER_ROLE_LABEL[creatorRole]}
          </Chip>
        </div>
      </div>
    </div>
  );
}
