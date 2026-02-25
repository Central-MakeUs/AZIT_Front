import { Chip } from '@azit/design-system/chip';

import * as styles from '@/widgets/mypage/styles/MyProfileSection.css';
import { MypageStatCard } from '@/widgets/mypage/ui/MypageStatCard';

import {
  MEMBER_ROLE_LABEL,
  ROLE_CHIP_TYPE_MAP,
} from '@/shared/constants/member-role';

import type { MyInfoResult } from '@/entities/user/model';

interface MyProfileSectionProps {
  profile: MyInfoResult;
}

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
        <MypageStatCard label="출석" value={profile.totalAttendanceCount} />
        <MypageStatCard
          label="포인트"
          value={profile.totalPoints.toLocaleString('ko-KR')}
        />
      </div>
    </section>
  );
}
