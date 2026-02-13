import * as styles from '@/features/mypage-attendance/styles/AttendanceRecordList.css.ts';
import { AttendanceRecordListItem } from '@/features/mypage-attendance/ui/AttendanceRecordListItem';

import type { AttendanceRecord } from '@/shared/mock/mypage-attendance';

interface AttendanceRecordListProps {
  records: AttendanceRecord[];
}

export function AttendanceRecordList({ records }: AttendanceRecordListProps) {
  return (
    <div className={styles.listContainer}>
      {records.map((record) => (
        <AttendanceRecordListItem key={record.id} record={record} />
      ))}
    </div>
  );
}
