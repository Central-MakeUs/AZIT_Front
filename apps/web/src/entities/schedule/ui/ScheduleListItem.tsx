import { Chip } from '@azit/design-system/chip';
import { ClockIcon, MarkerPinIcon, UsersIcon } from '@azit/design-system/icon';

import type { ScheduleListItem as ScheduleListItemType } from '@/entities/schedule/model/schedule.types';
import * as styles from '@/entities/schedule/styles/ScheduleListItem.css.ts';

function formatMeetingAt(meetingAt: string | undefined) {
  if (!meetingAt) return { month: '', day: '', time: '' };
  try {
    const date = new Date(meetingAt);
    return {
      month: `${date.getMonth() + 1}월`,
      day: `${date.getDate()}일`,
      time: date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    };
  } catch {
    return { month: '', day: '', time: '' };
  }
}

function buildTags(
  item: ScheduleListItemType
): { label: string; type: 'primary' | 'secondary' }[] {
  const tags: { label: string; type: 'primary' | 'secondary' }[] = [];
  if (item.runType) {
    tags.push({
      label: item.runType === 'REGULAR' ? '정기런' : '번개런',
      type: 'primary',
    });
  }
  if (item.distance != null)
    tags.push({ label: `${item.distance}km`, type: 'secondary' });
  if (item.pace != null) {
    const min = Math.floor(item.pace);
    const sec = Math.round((item.pace - min) * 60);
    tags.push({
      label: `${min}'${sec.toString().padStart(2, '0')}"/km`,
      type: 'secondary',
    });
  }
  return tags;
}

interface ScheduleListItemProps {
  item: ScheduleListItemType;
  handleClick: () => void;
}

export function ScheduleListItem({ item, handleClick }: ScheduleListItemProps) {
  const { month, day, time } = formatMeetingAt(item.meetingAt);
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
            <Chip
              key={index}
              type={tag.type === 'primary' ? 'primary' : 'skyblue'}
            >
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
