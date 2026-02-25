import { Chip } from '@azit/design-system/chip';
import { ClockIcon, MarkerPinIcon, UsersIcon } from '@azit/design-system/icon';

import {
  formatDistance,
  formatMeetingListDate,
  formatPace,
  formatRunType,
} from '@/entities/schedule/lib/formatter';
import type { ScheduleListItem as ScheduleListItemType } from '@/entities/schedule/model/schedule.types';
import * as styles from '@/entities/schedule/styles/ScheduleListItem.css.ts';

const buildTags = (
  item: ScheduleListItemType
): { label: string; type: 'primary' | 'secondary' | 'gray' }[] => {
  const tags: { label: string; type: 'primary' | 'secondary' | 'gray' }[] = [];
  if (item.runType) {
    tags.push({
      label: formatRunType(item.runType),
      type: item.runType === 'REGULAR' ? 'primary' : 'secondary',
    });
  }
  if (item.distance != null)
    tags.push({ label: formatDistance(item.distance), type: 'gray' });
  if (item.pace != null) {
    tags.push({ label: formatPace(item.pace), type: 'gray' });
  }
  return tags;
};

interface ScheduleListItemProps {
  item: ScheduleListItemType;
  handleClick: () => void;
}

export function ScheduleListItem({ item, handleClick }: ScheduleListItemProps) {
  const { month, day, time } = formatMeetingListDate(item.meetingAt);
  const tags = buildTags(item);

  const current = item.currentParticipants ?? 0;
  const max = item.maxParticipants ?? 0;

  return (
    <div
      className={styles.itemContainer}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className={styles.dateContainer}>
        <p className={styles.month}>{month}</p>
        <p className={styles.day}>{day}</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <Chip key={index} type={tag.type}>
              {tag.label}
            </Chip>
          ))}
        </div>
        <p className={styles.title}>{item.title ?? ''}</p>
        <div className={styles.detailsContainer}>
          <div className={styles.detailItem}>
            <ClockIcon size={16} color="secondary" />
            <span className={styles.detailText}>{time}</span>
          </div>
          <div className={styles.detailItem}>
            <MarkerPinIcon size={16} color="secondary" />
            <span className={styles.detailText}>{item.placeName ?? ''}</span>
          </div>
          <div className={styles.detailItem}>
            <UsersIcon size={16} color="secondary" />
            <span className={styles.detailText}>
              {current}/{max}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
