import * as styles from '@/widgets/mypage/styles/MemberList.css';
import { MemberListItem } from '@/widgets/mypage/ui/MemberListItem';

import type { MemberItem } from '@/entities/user/model';

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
      {members.map((member) => (
        <MemberListItem
          key={member.id}
          memberId={member.memberId}
          nickname={member.nickname}
          profileImageUrl={member.profileImageUrl}
          crewMemberRole={member.role}
          joinedDate={member.joinedDate}
          onDeleteMember={onDeleteMember}
          isDeleting={isDeletingMemberId === member.memberId}
        />
      ))}
    </div>
  );
}
