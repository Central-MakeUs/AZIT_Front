import * as styles from '@/features/crew-manage/styles/RequestList.css';
import { RequestListItem } from '@/features/crew-manage/ui/RequestListItem';

import type { MemberRequestItem } from '@/entities/crew/model/crew.types';

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
