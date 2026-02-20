import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/mypage/styles/MyAttendancePage.css.ts';

import { MypageStatCard } from '@/widgets/mypage/ui';
import { AttendanceRecordList } from '@/widgets/mypage-attendance/ui';
import { ScheduleCalendar } from '@/widgets/schedule-calendar/ui/ScheduleCalendar';
import { ScheduleSectionLayout } from '@/widgets/schedule-section-layout/ui';

import { mockAttendanceRecords } from '@/shared/mock/mypage-attendance';
import { memberQueries } from '@/shared/queries';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

export function MyAttendancePage() {
  const { pop } = useFlow();

  const handleBack = () => {
    pop();
  };

  const { data: myInfoData } = useQuery(memberQueries.myInfoQuery());
  const totalAttendanceCount = myInfoData?.ok
    ? myInfoData.data.result.totalAttendanceCount
    : 0;
  const totalPoints = myInfoData?.ok ? myInfoData.data.result.totalPoints : 0;

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
              value={new Date()}
              onChange={() => {}}
              activeStartDate={new Date()}
              onActiveStartDateChange={() => {}}
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
              <AttendanceRecordList records={mockAttendanceRecords} />
            </>
          }
        />
      </AppLayout>
    </AppScreen>
  );
}
