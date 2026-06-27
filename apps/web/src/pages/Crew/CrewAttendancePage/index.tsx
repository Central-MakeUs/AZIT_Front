import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';

import { useFlow } from '@/app/routes/stackflow';

import { MypageStatCard } from '@/widgets/Mypage/ui';
import { ScheduleSectionLayout } from '@/widgets/ScheduleSectionLayout/ui';

import { AttendanceRecordList } from '@/features/Crew/mypage-attendance/ui';

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
        <section className={scrollContainer}>
          <ScheduleSectionLayout
            topSection={
              <ScheduleCalendar
                scheduleData={myAttendanceCalendarData}
                explicitViewDate={viewDate}
                onChangeExplicitViewDate={setViewDate}
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
        </section>
      </AppLayout>
    </AppScreen>
  );
}
