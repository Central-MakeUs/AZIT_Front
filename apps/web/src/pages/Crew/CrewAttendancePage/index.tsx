import { Header } from '@azit/design-system/header';
import {
  LightningIcon,
  PointCoinIcon,
  WarningIcon,
  XIcon,
} from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';

import { useFlow } from '@/app/routes/stackflow';

import { ScheduleSectionLayout } from '@/widgets/ScheduleSectionLayout/ui';

import { AttendanceRecordList } from '@/features/Crew/ui';

import { userQueries } from '@/entities/User/api/queries';

import { formatDate } from '@/shared/lib/formatters';
import { useCalendar } from '@/shared/lib/useCalendar';
import { scrollContainer } from '@/shared/styles/container.css';
import { BackButton } from '@/shared/ui/button';
import { ScheduleCalendar } from '@/shared/ui/calendar/ui/ScheduleCalendar';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from './index.css';

export function CrewAttendancePage() {
  const { pop } = useFlow();

  const { viewDate, setViewDate } = useCalendar();

  const handleBack = () => {
    pop();
  };

  const yearMonth = formatDate(viewDate, 'YYYY-MM');

  const { data: myAttendanceCalendarData = [] } = useQuery({
    ...userQueries.getMyAttendanceCalendarQuery({ yearMonth }),
    enabled: !!yearMonth,
  });

  const { data: myAttendanceData } = useQuery({
    ...userQueries.getMyAttendanceQuery({ yearMonth }),
    enabled: !!yearMonth,
  });

  const totalAttendanceLogs = myAttendanceData?.attendanceLogs ?? [];
  const totalPoints = myAttendanceData?.totalPoints ?? 0;

  const regularRunCount = totalAttendanceLogs.filter(
    (log) => log.status === 'ATTENDED' && log.runType === 'REGULAR'
  ).length;
  const lightningRunCount = totalAttendanceLogs.filter(
    (log) => log.status === 'ATTENDED' && log.runType === 'LIGHTNING'
  ).length;
  const absentCount = totalAttendanceLogs.filter(
    (log) => log.status === 'ABSENT'
  ).length;

  return (
    <AppScreen>
      <AppLayout>
        <Header
          sticky
          left={<BackButton onClick={handleBack} />}
          center="출석 로그"
        />
        <section className={scrollContainer}>
          <ScheduleSectionLayout
            topSection={
              <>
                <ScheduleCalendar
                  scheduleData={myAttendanceCalendarData}
                  explicitViewDate={viewDate}
                  onChangeExplicitViewDate={setViewDate}
                />
                <div className={styles.statsCardWrapper}>
                  <div className={styles.statsCard}>
                    <div className={styles.statItem}>
                      <LightningIcon size={24} color="primary" />
                      <span className={styles.statLabel}>정기런</span>
                      <span className={styles.statValue}>
                        {regularRunCount}회
                      </span>
                    </div>
                    <div className={styles.statItem}>
                      <LightningIcon
                        size={24}
                        color="inherit"
                        style={{ color: styles.lightIconColor }}
                      />
                      <span className={styles.statLabel}>번개런</span>
                      <span className={styles.statValue}>
                        {lightningRunCount}회
                      </span>
                    </div>
                    <div className={styles.statItem}>
                      <XIcon size={24} style={{ color: styles.xIconColor }} />
                      <span className={styles.statLabel}>결석</span>
                      <span className={styles.statValue}>{absentCount}회</span>
                    </div>
                    <div className={styles.statItem}>
                      <PointCoinIcon size={24} />
                      <span className={styles.statLabel}>포인트</span>
                      <span className={styles.statValue}>
                        {totalPoints.toLocaleString('ko-KR')}P
                      </span>
                    </div>
                  </div>
                </div>
              </>
            }
            scheduleContent={
              <>
                <AttendanceRecordList records={totalAttendanceLogs} />
              </>
            }
          />
        </section>
      </AppLayout>
    </AppScreen>
  );
}
