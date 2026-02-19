import { Chip } from '@azit/design-system/chip';
import type { ChipType } from '@azit/design-system/components/chip/Chip.css';
import {
  CheckCircleBrokenIcon,
  CoinsStackedIcon,
} from '@azit/design-system/icon';

import { MEMBER_ROLE, MEMBER_ROLE_LABEL } from '@/features/my/model/role';
import type { MemberRole } from '@/features/my/model/types';
import * as styles from '@/features/my/styles/MyProfileSection.css';

import type { MyInfoResult } from '@/shared/api/models/my';

import { MypageStatCard } from './MypageStatCard';

interface MyProfileSectionProps {
  profile: MyInfoResult;
}

const ROLE_CHIP_TYPE_MAP: Record<MemberRole, ChipType> = {
  [MEMBER_ROLE.LEADER]: 'skyblue',
  [MEMBER_ROLE.MEMBER]: 'green',
};

export function MyProfileSection({ profile }: MyProfileSectionProps) {
  return (
    <section className={styles.container}>
      <div className={styles.profileRow}>
        {profile.profileImageUrl ? (
          <img
            src={profile.profileImageUrl}
            alt={'프로필 이미지'}
            className={styles.avatar}
          />
        ) : (
          <div
            className={styles.avatar}
            role="img"
            aria-label={profile.nickname}
          />
        )}
        <div className={styles.profileInfo}>
          <Chip type={ROLE_CHIP_TYPE_MAP[profile.crewMemberRole]}>
            {MEMBER_ROLE_LABEL[profile.crewMemberRole]}
          </Chip>
          <span className={styles.nickname}>{profile.nickname}</span>
        </div>
      </div>
      <div className={styles.statGrid}>
        <MypageStatCard
          icon={<CheckCircleBrokenIcon size={24} strokeWidth={1.25} />}
          label="출석"
          value={profile.totalAttendanceCount}
        />
        <MypageStatCard
          icon={<CoinsStackedIcon size={24} strokeWidth={1.25} />}
          label="포인트"
          value={profile.totalPoints.toLocaleString('ko-KR')}
        />
      </div>
    </section>
  );
}
