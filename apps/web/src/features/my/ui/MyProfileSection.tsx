import { Chip } from '@azit/design-system/chip';
import type { ChipType } from '@azit/design-system/components/chip/Chip.css';

import { MEMBER_ROLE, MEMBER_ROLE_LABEL } from '@/features/my/model/role';
import type { MemberRole } from '@/features/my/model/types';
import * as styles from '@/features/my/styles/MyProfileSection.css';

import type { MyInfoResult } from '@/shared/api/models/my';

interface MyProfileSectionProps {
  profile: MyInfoResult;
}

const ROLE_CHIP_TYPE_MAP: Record<MemberRole, ChipType> = {
  [MEMBER_ROLE.LEADER]: 'skyblue',
  [MEMBER_ROLE.MEMBER]: 'green',
};

export function MyProfileSection({ profile }: MyProfileSectionProps) {
  console.log(profile);
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
      {/* TODO: 운영 기능 오픈시 제공 */}
      {/* <div className={styles.statGrid}>
        <MypageStatCard
          icon={<CheckIcon size={24} color="primary" />}
          label="출석"
          value={profile.attendanceCount}
        />
        <MypageStatCard
          icon={<CoinsStackedIcon size={24} color="primary" />}
          label="포인트"
          value={profile.pointCount.toLocaleString('ko-KR')}
        />
      </div> */}
    </section>
  );
}
