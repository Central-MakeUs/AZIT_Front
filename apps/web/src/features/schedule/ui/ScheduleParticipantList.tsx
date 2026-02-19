import { ChevronRightIcon } from '@azit/design-system/icon';

import * as styles from '@/features/schedule/styles/ScheduleParticipantList.css';
import {
  ScheduleParticipantListItem,
  ScheduleParticipantTitle,
} from '@/features/schedule/ui';

import type { ScheduleParticipant } from '@/shared/mock/schedule';

interface ScheduleParticipantListProps {
  participants: ScheduleParticipant[];
  participantCount: number;
  maxParticipants: number;
  handleClickMore?: () => void;
}

export function ScheduleParticipantList({
  participants,
  participantCount,
  maxParticipants,
  handleClickMore,
}: ScheduleParticipantListProps) {
  return (
    <div className={styles.section}>
      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <ScheduleParticipantTitle
            participantCount={participantCount}
            maxParticipants={maxParticipants}
          />
        </div>
        <button
          type="button"
          className={styles.moreLink}
          onClick={handleClickMore}
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
