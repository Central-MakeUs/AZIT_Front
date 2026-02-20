import { Chip } from '@azit/design-system/chip';
import type { ChipType } from '@azit/design-system/components/chip/Chip.css';
import {
  CheckCircleBrokenIcon,
  CoinsStackedIcon,
} from '@azit/design-system/icon';

import * as styles from '@/widgets/my/styles/MyProfileSection.css';
import { MypageStatCard } from '@/widgets/my/ui/MypageStatCard';

import { MEMBER_ROLE, MEMBER_ROLE_LABEL } from '@/shared/config/member-role';

import type { MemberRole } from '@/entities/user/model';
import type { MyInfoResult } from '@/entities/user/model';

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
