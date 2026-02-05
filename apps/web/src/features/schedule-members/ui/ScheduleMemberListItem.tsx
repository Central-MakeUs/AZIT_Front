import { Chip } from '@azit/design-system';
import type { ScheduleParticipant } from '@/shared/mock/schedule';
import * as styles from '../styles/ScheduleMemberListItem.css';

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
        {member.isLeader && <Chip type="opacity">리더</Chip>}
      </div>
    </div>
  );
}
