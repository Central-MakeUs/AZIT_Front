import * as styles from '@/widgets/mypage/styles/MemberList.css';
import { MemberListItem } from '@/widgets/mypage/ui/MemberListItem';

import type { MemberItem } from '@/entities/user/model';

interface MemberListProps {
  members: MemberItem[];
}

export function MemberList({ members }: MemberListProps) {
  return (
    <div className={styles.list}>
      {members.map((member) => (
        <MemberListItem
          key={member.id}
          nickname={member.nickname}
          profileImageUrl={member.profileImageUrl}
          crewMemberRole={member.role}
          joinedDate={member.joinedDate}
        />
      ))}
    </div>
  );
}
