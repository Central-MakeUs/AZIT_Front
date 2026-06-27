import { Divider } from '@azit/design-system/divider';

import { MemberListItem } from '@/features/Crew/ui/MemberListItem';

import type { MemberItem } from '@/entities/User/model';

import * as styles from '../styles/MemberList.css';

interface MemberListProps {
  members: MemberItem[];
  onDeleteMember?: (memberId: number) => void;
  isDeletingMemberId?: number;
}

export function MemberList({
  members,
  onDeleteMember,
  isDeletingMemberId,
}: MemberListProps) {
  return (
    <div className={styles.list}>
      {members.map((member, index) => (
        <div key={member.id}>
          <MemberListItem
            memberId={member.memberId}
            nickname={member.nickname}
            profileImageUrl={member.profileImageUrl}
            crewMemberRole={member.role}
            joinedDate={member.joinedDate}
            onDeleteMember={onDeleteMember}
            isDeleting={isDeletingMemberId === member.memberId}
          />
          {index < members.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
}
