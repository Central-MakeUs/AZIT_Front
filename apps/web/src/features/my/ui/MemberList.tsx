import { MemberListItem } from './MemberListItem';
import * as styles from '../styles/MemberList.css';
import type { MemberManagementItem } from '@/shared/mock/member-management';

interface MemberListProps {
  members: MemberManagementItem[];
  onRemoveMember?: (member: MemberManagementItem) => void;
}

export function MemberList({ members, onRemoveMember }: MemberListProps) {
  return (
    <div className={styles.list}>
      {members.map((member) => (
        <MemberListItem
          key={member.id}
          nickname={member.nickname}
          crewMemberRole={member.crewMemberRole}
          joinDate={member.joinDate}
          onRemove={onRemoveMember ? () => onRemoveMember(member) : undefined}
        />
      ))}
    </div>
  );
}
