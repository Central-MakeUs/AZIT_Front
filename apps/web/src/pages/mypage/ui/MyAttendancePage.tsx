import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/mypage/styles/MyAttendancePage.css.ts';

import { MypageStatCard } from '@/widgets/mypage/ui';
import { AttendanceRecordList } from '@/widgets/mypage-attendance/ui';
import { ScheduleCalendar } from '@/widgets/schedule-calendar/ui/ScheduleCalendar';
import { ScheduleSectionLayout } from '@/widgets/schedule-section-layout/ui';

import { formatDate } from '@/shared/lib/formatters';
import { useCalendar } from '@/shared/lib/useCalendar';
import { memberQueries } from '@/shared/queries';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

export function MyAttendancePage() {
  const { pop } = useFlow();
  const { selectedDate, setSelectedDate } = useCalendar();

  const handleBack = () => {
    pop();
  };

  const yearMonth = formatDate(selectedDate, 'YYYY-MM');

  const { data: myAttendanceCalendarData = [] } = useQuery({
    ...memberQueries.getMyAttendanceCalendarQuery({ yearMonth }),
    enabled: !!yearMonth,
  });

  const { data: myAttendanceData } = useQuery({
    ...memberQueries.getMyAttendanceQuery({ yearMonth }),
    enabled: !!yearMonth,
  });

  const totalAttendanceCount = myAttendanceData
    ? (myAttendanceData.totalAttendanceCount ?? 0)
    : 0;
  const totalPoints = myAttendanceData
    ? (myAttendanceData.totalPoints ?? 0)
    : 0;
  const totalAttendanceLogs = myAttendanceData
    ? (myAttendanceData.attendanceLogs ?? [])
    : [];

  return (
    <AppScreen>
      <AppLayout>
        <Header
          sticky
          left={<BackButton onClick={handleBack} />}
          center="출석 로그"
        />
        <ScheduleSectionLayout
          topSection={
            <ScheduleCalendar
              value={selectedDate}
              onChange={setSelectedDate}
              scheduleData={myAttendanceCalendarData}
            />
          }
          scheduleContent={
            <>
              <div className={styles.statCardsContainer}>
                <MypageStatCard
                  label="이번 달 출석"
                  value={totalAttendanceCount.toLocaleString('ko-KR')}
                />
                <MypageStatCard
                  label="획득 포인트"
                  value={totalPoints.toLocaleString('ko-KR')}
                />
              </div>
              <AttendanceRecordList records={totalAttendanceLogs} />
            </>
          }
        />
      </AppLayout>
    </AppScreen>
  );
}
