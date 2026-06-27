import { Chip } from '@azit/design-system/chip';

import { RoundProfileImage } from '@/widgets/profile/ui/RoundProfileImage';
import * as styles from '@/widgets/schedule/styles/ScheduleDetailHeaderSection.css';

import {
  MEMBER_ROLE_LABEL,
  ROLE_CHIP_TYPE_MAP,
} from '@/shared/constants/member-role';
import {
  RUN_TYPE_CHIP_TYPE_MAP,
  RUN_TYPE_LABEL,
} from '@/shared/constants/run-type';

import type { MemberRole } from '@/entities/User/model';

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
  const runTypeLabel =
    RUN_TYPE_LABEL[runType as keyof typeof RUN_TYPE_LABEL] ??
    RUN_TYPE_LABEL.LIGHTNING;
  const runTypeChipType =
    RUN_TYPE_CHIP_TYPE_MAP[runType as keyof typeof RUN_TYPE_CHIP_TYPE_MAP] ??
    'secondary';
  const name = creatorName ?? '알수 없는 사용자';

  return (
    <div className={styles.section}>
      <div className={styles.tagRow}>
        <Chip type={runTypeChipType}>{runTypeLabel}</Chip>
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
