// import { XIcon } from '@azit/design-system/icon';
import type { MemberRole } from '@/features/my/model/types';

import { formatJoinDate } from '@/shared/lib/formatters';

import { MEMBER_ROLE, MEMBER_ROLE_LABEL } from '../model/role';
import * as styles from '../styles/MemberListItem.css';

interface MemberListItemProps {
  nickname: string;
  crewMemberRole: MemberRole;
  joinedDate: string;
  profileImageUrl: string;
}

export function MemberListItem({
  nickname,
  profileImageUrl,
  crewMemberRole,
  joinedDate,
}: MemberListItemProps) {
  return (
    <article className={styles.card}>
      <div className={styles.contentWrapper}>
        <div className={styles.contentRow}>
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={'프로필 이미지'}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatar} aria-hidden />
          )}
          <div className={styles.info}>
            <div className={styles.nameRow}>
              <span className={styles.nickname}>{nickname}</span>
              <span
                className={`${styles.badge} ${
                  crewMemberRole === MEMBER_ROLE.LEADER
                    ? styles.badgeLeader
                    : styles.badgeMember
                }`}
              >
                {MEMBER_ROLE_LABEL[crewMemberRole]}
              </span>
            </div>
            <span
              className={styles.joinDate}
            >{`${formatJoinDate(joinedDate)} 가입`}</span>
          </div>
        </div>
        {/* <button
          type="button"
          className={styles.removeButton}
          aria-label="멤버 제거"
        >
          <XIcon size={20} color="secondary" />
        </button> */}
      </div>
    </article>
  );
}
