import { Chip } from '@azit/design-system/chip';
import { CheckIcon, CoinsStackedIcon } from '@azit/design-system/icon';
import type { MypageProfile } from '@/shared/mock/mypage';
import { MypageStatCard } from './MypageStatCard';
import * as styles from '../styles/MypageProfileSection.css';

interface MypageProfileSectionProps {
  profile: MypageProfile;
}

export function MypageProfileSection({ profile }: MypageProfileSectionProps) {
  return (
    <section className={styles.container}>
      <div className={styles.profileRow}>
        <div
          className={styles.avatar}
          role="img"
          aria-label={profile.nickname}
        />
        <div className={styles.profileInfo}>
          {profile.isLeader && <Chip type="opacity">리더</Chip>}
          <span className={styles.nickname}>{profile.nickname}</span>
        </div>
      </div>
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
