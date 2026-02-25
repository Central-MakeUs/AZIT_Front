import { Button } from '@azit/design-system/button';
import { ClockIcon, MarkerPinIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/mypage-attendance/styles/AttendanceRecordListItem.css';

import type { AttendanceRecord } from '@/entities/user/model';

interface AttendanceRecordListItemProps {
  record: AttendanceRecord;
}

export function AttendanceRecordListItem({
  record,
}: AttendanceRecordListItemProps) {
  const getStatusButtonStyle = () => {
    switch (record.status) {
      case 'ATTENDED':
        return 'attended';
      case 'ABSENT':
        return 'absent';
      default:
        return 'absent';
    }
  };

  const getStatusText = () => {
    return record.status === 'ABSENT' ? '결석' : '출석';
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.dateContainer}>
        <p className={styles.date}>{record.meetingAt?.split(' ')[0]}</p>
        <p className={styles.date}>{record.meetingAt?.split(' ')[1]}</p>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.title}>{record.title}</p>
        <div className={styles.detailsContainer}>
          <div className={styles.detailItem}>
            <ClockIcon size={16} color="secondary" />
            <span className={styles.detailText}>{record.meetingAt}</span>
          </div>
          <div className={styles.detailItem}>
            <MarkerPinIcon size={16} color="secondary" />
            <span className={styles.detailText}>{record.placeName}</span>
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
