import { Divider } from '@azit/design-system/divider';

import * as styles from '@/features/Crew/styles/RequestList.css';

import type { MemberRequestItem } from '@/entities/Crew/model/crew.types';

import { RequestListItem } from './RequestListItem';


interface RequestListProps {
  crewId: number;
  requests: MemberRequestItem[];
}

export function RequestList({ crewId, requests }: RequestListProps) {
  return (
    <div className={styles.list}>
      {requests.map((request, index) => (
        <div key={request.memberId}>
          <RequestListItem
            crewId={crewId}
            targetMemberId={request.memberId}
            nickname={request.nickname}
            profileImageUrl={request.profileImageUrl}
            requestedAt={request.requestedAt}
          />
          {index < requests.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
}
