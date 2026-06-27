import { ChevronRightIcon, PointCoinIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/Mypage/styles/MyProfileSection.css';

import type { MyInfoResult } from '@/entities/User/model';

interface MyProfileSectionProps {
  profile: MyInfoResult;
  navigateToMyProfileEditPage: () => void;
}

export function MyProfileSection({
  profile,
  navigateToMyProfileEditPage,
}: MyProfileSectionProps) {
  return (
    <section className={styles.container}>
      {profile.profileImageUrl ? (
        <img
          src={profile.profileImageUrl}
          alt="프로필 이미지"
          className={styles.avatar}
        />
      ) : (
        <div
          className={styles.avatar}
          role="img"
          aria-label={profile.nickname}
        />
      )}
      <button
        type="button"
        className={styles.nicknameRow}
        onClick={navigateToMyProfileEditPage}
      >
        <span className={styles.nickname}>{profile.nickname}</span>
        <ChevronRightIcon size={20} className={styles.chevron} />
      </button>
      <div className={styles.pointsBadge}>
        <PointCoinIcon size={20} className={styles.pointsIcon} />
        <span className={styles.pointsValue}>
          {profile.totalPoints.toLocaleString('ko-KR')}
        </span>
      </div>
    </section>
  );
}
