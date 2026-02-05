import { ChevronRightIcon } from '@azit/design-system';
import type { ScheduleParticipant } from '@/shared/mock/schedule';
import { ScheduleParticipantListItem } from './ScheduleParticipantListItem';
import * as styles from '../styles/ScheduleParticipantList.css';

interface ScheduleParticipantListProps {
  participants: ScheduleParticipant[];
  participantCount: number;
  maxParticipants: number;
  onSeeMore?: () => void;
}

export function ScheduleParticipantList({
  participants,
  participantCount,
  maxParticipants,
  onSeeMore,
}: ScheduleParticipantListProps) {
  return (
    <div className={styles.section}>
      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>참여 멤버</h3>
          <span className={styles.count}>{participantCount}</span>
          <span className={styles.countSuffix}>/{maxParticipants}</span>
        </div>
        <button
          type="button"
          className={styles.moreLink}
          onClick={onSeeMore}
          aria-label="참여 멤버 더보기"
        >
          <span className={styles.moreText}>더보기</span>
          <ChevronRightIcon size={16} color="secondary" />
        </button>
      </div>
      <div className={styles.participantList}>
        {participants.map((participant) => (
          <ScheduleParticipantListItem
            key={participant.id}
            participant={participant}
          />
        ))}
      </div>
    </div>
  );
}
