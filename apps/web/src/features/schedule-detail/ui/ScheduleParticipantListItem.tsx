import * as styles from '@/features/schedule-detail/styles/ScheduleParticipantListItem.css';

import type { ScheduleParticipant } from '@/shared/mock/schedule';

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
