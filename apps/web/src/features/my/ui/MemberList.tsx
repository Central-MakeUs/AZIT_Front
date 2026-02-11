import { MemberListItem } from './MemberListItem';
import * as styles from '../styles/MemberList.css';
import type { MemberItem } from '@/features/my/model/types';

interface MemberListProps {
  members: MemberItem[];
  canRemoveMember?: boolean;
  onRemoveMember?: (member: MemberItem) => void;
}

export function MemberList({
  members,
  canRemoveMember = false,
  onRemoveMember,
}: MemberListProps) {
  return (
    <div className={styles.list}>
      {members.map((member) => (
        <MemberListItem
          key={member.id}
          nickname={member.nickname}
          crewMemberRole={member.role}
          joinedDate={member.joinedDate}
          onRemove={
            canRemoveMember && onRemoveMember
              ? () => onRemoveMember(member)
              : undefined
          }
        />
      ))}
    </div>
  );
}
