import { Chip } from '@azit/design-system/chip';

import * as styles from '@/features/schedule/styles/ScheduleMemberListItem.css';

import type { ScheduleParticipant } from '@/shared/mock/schedule';

interface ScheduleMemberListItemProps {
  member: ScheduleParticipant & { isLeader?: boolean };
}

export function ScheduleMemberListItem({
  member,
}: ScheduleMemberListItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.avatar} />
      <div className={styles.infoRow}>
        <span className={styles.nickname}>{member.nickname}</span>
        {member.isLeader && <Chip type="skyblue">리더</Chip>}
      </div>
    </div>
  );
}
