import { Button } from '@azit/design-system/button';
import { ClockIcon, MarkerPinIcon } from '@azit/design-system/icon';

import * as styles from '@/features/mypage-attendance/styles/AttendanceRecordListItem.css';

import type { AttendanceRecord } from '@/shared/mock/mypage-attendance';

interface AttendanceRecordListItemProps {
  record: AttendanceRecord;
}

export function AttendanceRecordListItem({
  record,
}: AttendanceRecordListItemProps) {
  const getStatusButtonStyle = () => {
    switch (record.status) {
      case 'attended':
        return 'attended';
      case 'attended-alt':
        return 'attendedAlt';
      case 'absent':
        return 'absent';
      default:
        return 'absent';
    }
  };

  const getStatusText = () => {
    return record.status === 'absent' ? '결석' : '출석';
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.dateContainer}>
        <p className={styles.date}>{record.date}</p>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.title}>{record.title}</p>
        <div className={styles.detailsContainer}>
          <div className={styles.detailItem}>
            <ClockIcon size={16} color="secondary" />
            <span className={styles.detailText}>{record.time}</span>
          </div>
          <div className={styles.detailItem}>
            <MarkerPinIcon size={16} color="secondary" />
            <span className={styles.detailText}>{record.location}</span>
          </div>
        </div>
      </div>
      <Button
        size="small"
        className={styles.statusButton[getStatusButtonStyle()]}
      >
        {getStatusText()}
      </Button>
    </div>
  );
}
