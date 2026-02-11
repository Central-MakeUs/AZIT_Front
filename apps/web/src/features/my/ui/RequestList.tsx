import type { MemberRequestItem } from '@/features/my/model/types';
import { formatJoinDate } from '@/shared/lib/formatters';
import { RequestListItem } from './RequestListItem';
import * as styles from '../styles/RequestList.css';

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
          requestedAt={`${formatJoinDate(request.requestedAt)} 요청`}
        />
      ))}
    </div>
  );
}
