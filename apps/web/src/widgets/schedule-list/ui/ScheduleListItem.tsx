import { Chip } from '@azit/design-system/chip';
import { ClockIcon, MarkerPinIcon, UsersIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/schedule-list/styles/ScheduleListItem.css';

import type { ScheduleItem } from '@/shared/mock/home';

interface ScheduleListItemProps {
  item: ScheduleItem;
  handleClick: () => void;
}

export function ScheduleListItem({ item, handleClick }: ScheduleListItemProps) {
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
        <p className={styles.month}>{item.month}</p>
        <p className={styles.day}>{item.day}</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <Chip
              key={index}
              type={tag.type === 'primary' ? 'primary' : 'skyblue'}
            >
              {tag.label}
            </Chip>
          ))}
        </div>
        <p className={styles.title}>{item.title}</p>
        <div className={styles.detailsContainer}>
          <div className={styles.detailItem}>
            <ClockIcon size={16} color="secondary" />
            <span className={styles.detailText}>{item.time}</span>
          </div>
          <div className={styles.detailItem}>
            <MarkerPinIcon size={16} color="secondary" />
            <span className={styles.detailText}>{item.location}</span>
          </div>
          <div className={styles.detailItem}>
            <UsersIcon size={16} color="secondary" />
            <span className={styles.detailText}>
              {item.participants.current}/{item.participants.max}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
