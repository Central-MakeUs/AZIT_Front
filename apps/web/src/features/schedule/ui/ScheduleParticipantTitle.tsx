import * as styles from '@/features/schedule/styles/ScheduleParticipantTitle.css';

interface ScheduleParticipantTitleProps {
  participantCount: number;
  maxParticipants: number;
  title?: string;
}

export function ScheduleParticipantTitle({
  participantCount,
  maxParticipants,
  title = '참여 멤버',
}: ScheduleParticipantTitleProps) {
  return (
    <div className={styles.root}>
      <p className={styles.title}>{title}</p>
      <div>
        <span className={styles.count}>{participantCount}</span>
        <span className={styles.countSuffix}>/{maxParticipants}</span>
      </div>
    </div>
  );
}
