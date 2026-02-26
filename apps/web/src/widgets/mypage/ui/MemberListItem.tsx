import { AlertDialog } from '@azit/design-system/alert-dialog';
import { XIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/mypage/styles/MemberListItem.css';

import { MEMBER_ROLE, MEMBER_ROLE_LABEL } from '@/shared/constants/member-role';
import { formatJoinDate } from '@/shared/lib/formatters';

import type { MemberRole } from '@/entities/user/model';

interface MemberListItemProps {
  memberId: number;
  nickname: string;
  crewMemberRole: MemberRole;
  joinedDate: string;
  profileImageUrl: string;
  onDeleteMember?: (memberId: number) => void;
  isDeleting?: boolean;
}

export function MemberListItem({
  memberId,
  nickname,
  profileImageUrl,
  crewMemberRole,
  joinedDate,
  onDeleteMember,
  isDeleting,
}: MemberListItemProps) {
  const handleDelete = () => {
    onDeleteMember?.(memberId);
  };

  const showRemoveButton =
    onDeleteMember !== undefined && crewMemberRole !== MEMBER_ROLE.LEADER;

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
        {showRemoveButton && (
          <AlertDialog
            trigger={
              <button
                type="button"
                className={styles.removeButton}
                disabled={isDeleting}
                aria-label="멤버 방출"
              >
                <XIcon size={20} color="inherit" />
              </button>
            }
            title="해당 멤버를 방출 하시겠습니까?"
            description={`‘${nickname}’님이 아지트 크루 멤버에서 제외됩니다`}
            actionText="방출하기"
            cancelText="취소하기"
            onAction={handleDelete}
          />
        )}
      </div>
    </article>
  );
}
