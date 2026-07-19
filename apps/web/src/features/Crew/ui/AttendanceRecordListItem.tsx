import { ClockIcon, MarkerPinIcon, UsersIcon } from '@azit/design-system/icon';

import * as styles from '@/features/Crew/styles/AttendanceRecordListItem.css';

import type { AttendanceRecord } from '@/entities/User/model';

import { formatDate } from '@/shared/lib/formatters';

interface AttendanceRecordListItemProps {
  record: AttendanceRecord;
}

export function AttendanceRecordListItem({
  record,
}: AttendanceRecordListItemProps) {
  const getBadgeStyle = () => {
    if (record.status === 'ABSENT') return styles.badge.absent;
    return record.runType === 'LIGHTNING'
      ? styles.badge.lightning
      : styles.badge.regular;
  };

  const getBadgeText = () => {
    if (record.status === 'ABSENT') return '결석';
    return record.runType === 'LIGHTNING' ? '번개런' : '정기런';
  };

  const meetingAt = new Date(record.meetingAt!);

  return (
    <div className={styles.itemContainer}>
      <div className={styles.dateContainer}>
        <p className={styles.date}>{formatDate(meetingAt, 'M월')}</p>
        <p className={styles.date}>{formatDate(meetingAt, 'D일')}</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.badgeRow}>
          <span className={getBadgeStyle()}>{getBadgeText()}</span>
        </div>
        <p className={styles.title}>{record.title}</p>
        <div className={styles.detailsContainer}>
          <div className={styles.detailItem}>
            <ClockIcon size={16} color="secondary" />
            <span className={styles.detailText}>
              {formatDate(meetingAt, 'HH:mm')}
            </span>
          </div>
          <div className={styles.detailItem}>
            <MarkerPinIcon size={16} color="secondary" />
            <span className={styles.detailText}>{record.placeName}</span>
          </div>
          <div className={styles.detailItem}>
            <UsersIcon size={16} color="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}
