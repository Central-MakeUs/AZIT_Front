import type { ScheduleParticipant } from '@/shared/mock/schedule';

import * as styles from '../styles/ScheduleParticipantListItem.css';

interface ScheduleParticipantListItemProps {
  participant: ScheduleParticipant;
}

export function ScheduleParticipantListItem({
  participant,
}: ScheduleParticipantListItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.avatar} />
      <span className={styles.nickname}>{participant.nickname}</span>
    </div>
  );
}
