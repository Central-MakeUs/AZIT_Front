import type { MemberItem } from '@/features/my/model/types';
import * as styles from '@/features/my/styles/MemberList.css';
import { MemberListItem } from '@/features/my/ui/MemberListItem';

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
