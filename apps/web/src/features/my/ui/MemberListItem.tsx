import { XIcon } from '@azit/design-system/icon';
import * as styles from '../styles/MemberListItem.css';
import type { MemberRole } from '@/features/my/model/types';
import { MEMBER_ROLE, MEMBER_ROLE_LABEL } from '../model/role';
import { formatJoinDate } from '@/shared/lib/formatters';

interface MemberListItemProps {
  nickname: string;
  crewMemberRole: MemberRole;
  joinedDate: string;
  onRemove?: () => void;
}

export function MemberListItem({
  nickname,
  crewMemberRole,
  joinedDate,
  onRemove,
}: MemberListItemProps) {
  return (
    <article className={styles.card}>
      <div className={styles.contentWrapper}>
        <div className={styles.contentRow}>
          <div className={styles.avatar} aria-hidden />
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
        {onRemove && (
          <button
            type="button"
            className={styles.removeButton}
            onClick={onRemove}
            aria-label="멤버 제거"
          >
            <XIcon size={20} color="secondary" />
          </button>
        )}
      </div>
    </article>
  );
}
