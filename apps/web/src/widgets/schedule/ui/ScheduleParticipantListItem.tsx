import { RoundProfileImage } from '@/widgets/profile/ui';
import * as styles from '@/widgets/schedule/styles/ScheduleParticipantListItem.css';

import type { ScheduleParticipant } from '@/shared/mock/schedule';
export type ScheduleParticipantOrientation = 'horizontal' | 'vertical';

interface ScheduleParticipantListItemProps {
  participant: ScheduleParticipant & { isLeader?: boolean };
  orientation?: ScheduleParticipantOrientation;
}

export function ScheduleParticipantListItem({
  participant,
  orientation = 'vertical',
}: ScheduleParticipantListItemProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={`${styles.item} ${isHorizontal ? styles.itemHorizontal : styles.itemVertical}`}
    >
      <div className={styles.profileWrapper}>
        <RoundProfileImage src={participant.profileImageUrl} size={48} />
        {participant.isLeader && (
          <div className={styles.leaderBadge} aria-label="리더">
            <LeaderStarIcon />
          </div>
        )}
      </div>
      {isHorizontal ? (
        <div className={styles.infoRow}>
          <span className={styles.nicknameHorizontal}>
            {participant.nickname}
          </span>
        </div>
      ) : (
        <span className={styles.nicknameVertical}>{participant.nickname}</span>
      )}
    </div>
  );
}

function LeaderStarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.leaderBadgeStar}
      aria-hidden
    >
      <path
        d="M6.26771 1.91854C6.39575 1.65913 6.45978 1.52942 6.54669 1.48798C6.62231 1.45192 6.71017 1.45192 6.78579 1.48798C6.87271 1.52942 6.93673 1.65913 7.06478 1.91854L8.2796 4.37963C8.3174 4.45621 8.3363 4.49451 8.36393 4.52424C8.38838 4.55056 8.41772 4.57189 8.4503 4.58704C8.4871 4.60415 8.52935 4.61033 8.61386 4.62268L11.3312 5.01986C11.6174 5.06169 11.7605 5.0826 11.8267 5.15249C11.8843 5.2133 11.9114 5.29686 11.9004 5.3799C11.8878 5.47535 11.7842 5.57624 11.5771 5.77802L9.61148 7.69248C9.55021 7.75216 9.51957 7.782 9.4998 7.81751C9.4823 7.84894 9.47107 7.88348 9.46674 7.9192C9.46185 7.95954 9.46908 8.00169 9.48354 8.08599L9.94732 10.7901C9.99624 11.0753 10.0207 11.2179 9.97473 11.3025C9.93474 11.3762 9.86365 11.4278 9.78127 11.4431C9.68658 11.4606 9.55852 11.3933 9.30241 11.2586L6.87311 9.98105C6.79742 9.94124 6.75957 9.92134 6.7197 9.91352C6.6844 9.9066 6.64809 9.9066 6.61278 9.91352C6.57291 9.92134 6.53507 9.94124 6.45937 9.98105L4.03008 11.2586C3.77396 11.3933 3.64591 11.4606 3.55122 11.4431C3.46883 11.4278 3.39775 11.3762 3.35775 11.3025C3.31179 11.2179 3.33625 11.0753 3.38516 10.7901L3.84895 8.08599C3.86341 8.00169 3.87064 7.95954 3.86574 7.9192C3.86141 7.88348 3.85018 7.84894 3.83268 7.81751C3.81291 7.782 3.78228 7.75216 3.721 7.69248L1.75543 5.77802C1.54827 5.57624 1.44469 5.47535 1.43208 5.3799C1.42111 5.29686 1.44821 5.2133 1.50582 5.15249C1.57203 5.0826 1.71511 5.06169 2.00126 5.01986L4.71863 4.62268C4.80313 4.61033 4.84539 4.60415 4.88219 4.58704C4.91477 4.57189 4.9441 4.55056 4.96856 4.52424C4.99618 4.49451 5.01508 4.45621 5.05288 4.37963L6.26771 1.91854Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.11111"
        stroke="currentColor"
        fill="currentColor"
      />
    </svg>
  );
}
