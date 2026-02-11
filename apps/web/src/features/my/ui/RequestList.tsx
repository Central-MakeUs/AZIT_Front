import { RequestListItem } from './RequestListItem';
import * as styles from '../styles/RequestList.css';
import type { MemberRequestItem } from '@/shared/mock/member-management';

interface RequestListProps {
  requests: MemberRequestItem[];
  onApprove?: (request: MemberRequestItem) => void;
  onReject?: (request: MemberRequestItem) => void;
}

export function RequestList({
  requests,
  onApprove,
  onReject,
}: RequestListProps) {
  return (
    <div className={styles.list}>
      {requests.map((request) => (
        <RequestListItem
          key={request.memberId}
          nickname={request.nickname}
          profileImageUrl={request.profileImageUrl}
          requestedAt={request.requestedAt}
          onApprove={onApprove ? () => onApprove(request) : undefined}
          onReject={onReject ? () => onReject(request) : undefined}
        />
      ))}
    </div>
  );
}
