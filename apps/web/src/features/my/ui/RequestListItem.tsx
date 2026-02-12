import { AlertDialog } from '@azit/design-system/alert-dialog';
import { memberQueries } from '@/shared/api/queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as styles from '../styles/RequestListItem.css';
import { formatJoinDate } from '@/shared/lib/formatters';

interface RequestListItemProps {
  crewId: number;
  targetMemberId: number;
  nickname: string;
  profileImageUrl: string;
  requestedAt: string;
}

export function RequestListItem({
  crewId,
  targetMemberId,
  nickname,
  profileImageUrl,
  requestedAt,
}: RequestListItemProps) {
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    ...memberQueries.approveJoinRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueries.joinRequestsKey(crewId),
      });
      queryClient.invalidateQueries({
        queryKey: memberQueries.crewMembersKey(crewId),
      });
    },
  });

  const rejectMutation = useMutation({
    ...memberQueries.rejectJoinRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueries.joinRequestsKey(crewId),
      });
    },
  });

  const handleApprove = () => {
    approveMutation.mutate({ crewId, targetMemberId });
  };

  const handleReject = () => {
    rejectMutation.mutate({ crewId, targetMemberId });
  };

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt=""
            className={styles.avatar}
            width={56}
            height={56}
          />
        ) : (
          <div
            className={styles.avatar}
            role="img"
            aria-label={'프로필 이미지'}
          />
        )}
        <div className={styles.info}>
          <span className={styles.nickname}>{nickname}</span>
          <span
            className={styles.requestDate}
          >{`${formatJoinDate(requestedAt)} 요청`}</span>
        </div>
      </div>
      <div className={styles.buttonRow}>
        <AlertDialog
          trigger={
            <button
              type="button"
              className={styles.rejectButton}
              disabled={rejectMutation.isPending}
              aria-label="요청 거절"
            >
              거절
            </button>
          }
          title="가입 요청을 거절하시겠습니까?"
          actionText="거절"
          cancelText="취소"
          onAction={handleReject}
        />
        <button
          type="button"
          className={styles.approveButton}
          onClick={handleApprove}
          disabled={approveMutation.isPending}
          aria-label="요청 승인"
        >
          승인
        </button>
      </div>
    </article>
  );
}
