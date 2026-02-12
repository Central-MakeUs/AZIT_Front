import { MemberListItem } from './MemberListItem';
import * as styles from '../styles/MemberList.css';
import type { MemberItem } from '@/features/my/model/types';

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
