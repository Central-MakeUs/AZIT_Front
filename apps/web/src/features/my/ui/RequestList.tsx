import * as styles from '@/features/my/styles/RequestList.css';
import { RequestListItem } from '@/features/my/ui/RequestListItem';

import type { MemberRequestItem } from '@/entities/user/model';

interface RequestListProps {
  crewId: number;
  requests: MemberRequestItem[];
}

export function RequestList({ crewId, requests }: RequestListProps) {
  return (
    <div className={styles.list}>
      {requests.map((request) => (
        <RequestListItem
          key={request.memberId}
          crewId={crewId}
          targetMemberId={request.memberId}
          nickname={request.nickname}
          profileImageUrl={request.profileImageUrl}
          requestedAt={request.requestedAt}
        />
      ))}
    </div>
  );
}
