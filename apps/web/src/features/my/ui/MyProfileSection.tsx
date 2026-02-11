import { Chip } from '@azit/design-system/chip';
import * as styles from '../styles/MyProfileSection.css';
import type { ChipType } from '@azit/design-system/components/chip/Chip.css';
import type { MyInfoResult } from '@/shared/api/models';
import { MEMBER_ROLE, MEMBER_ROLE_LABEL } from '../model/role';
import type { MemberRole } from '../model/types';

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
        <div
          className={styles.avatar}
          role="img"
          aria-label={profile.nickname}
        />
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
