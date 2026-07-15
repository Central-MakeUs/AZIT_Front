import { Button } from '@azit/design-system/button';

import * as styles from '@/features/Crew/styles/AttendanceRecordList.css';

import type { AttendanceRecord } from '@/entities/User/model';

import { AttendanceRecordListItem } from './AttendanceRecordListItem';

interface AttendanceRecordListProps {
  records: AttendanceRecord[];
}

export function AttendanceRecordList({ records }: AttendanceRecordListProps) {
  if (records.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyText}>
          출석 로그가 없어요.
          <br />
          일정에 참여하여 로그를 쌓아보세요!
        </p>
        <Button size="medium" className={styles.joinButton}>
          일정 참여하기
        </Button>
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
