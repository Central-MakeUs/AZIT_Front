import { CalendarIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/mypage-attendance/styles/AttendanceRecordList.css.ts';
import { AttendanceRecordListItem } from '@/widgets/mypage-attendance/ui/AttendanceRecordListItem';

import type { AttendanceRecord } from '@/entities/user/model';

interface AttendanceRecordListProps {
  records: AttendanceRecord[];
}

export function AttendanceRecordList({ records }: AttendanceRecordListProps) {
  if (records.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <CalendarIcon
          size={64}
          color="secondary"
          strokeWidth={1.2}
          aria-hidden
        />
        <p className={styles.emptyText}>이번 달에는 참여한 일정이 없어요!</p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {records.map((record) => (
        <AttendanceRecordListItem key={record.scheduleId} record={record} />
      ))}
    </div>
  );
}
