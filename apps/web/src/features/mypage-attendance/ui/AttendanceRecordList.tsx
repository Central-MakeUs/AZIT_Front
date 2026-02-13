import type { AttendanceRecord } from '@/shared/mock/mypage-attendance';

import { AttendanceRecordListItem } from './AttendanceRecordListItem';
import * as styles from '../styles/AttendanceRecordList.css.ts';

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
