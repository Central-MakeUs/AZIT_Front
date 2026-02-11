import * as styles from '../styles/RequestListItem.css';

function formatRequestedAt(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}년 ${month}월 요청`;
}

interface RequestListItemProps {
  nickname: string;
  profileImageUrl: string;
  requestedAt: string;
  onApprove?: () => void;
  onReject?: () => void;
}

export function RequestListItem({
  nickname,
  profileImageUrl,
  requestedAt,
  onApprove,
  onReject,
}: RequestListItemProps) {
  const requestDateLabel = formatRequestedAt(requestedAt);

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
          <div className={styles.avatar} aria-hidden />
        )}
        <div className={styles.info}>
          <span className={styles.nickname}>{nickname}</span>
          <span className={styles.requestDate}>{requestDateLabel}</span>
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button
          type="button"
          className={styles.rejectButton}
          onClick={onReject}
          aria-label="요청 거절"
        >
          거절
        </button>
        <button
          type="button"
          className={styles.approveButton}
          onClick={onApprove}
          aria-label="요청 승인"
        >
          승인
        </button>
      </div>
    </article>
  );
}
