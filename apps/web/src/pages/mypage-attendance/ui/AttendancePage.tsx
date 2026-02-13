import { Header } from '@azit/design-system/header';
import { CheckIcon, CoinsStackedIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { useFlow } from '@/app/routes/stackflow';

import { ScheduleCalendar } from '@/widgets/schedule-calendar/ui/ScheduleCalendar';
import { ScheduleSectionLayout } from '@/widgets/schedule-section-layout/ui';

import { MypageStatCard } from '@/features/my/ui/MypageStatCard';
import { AttendanceRecordList } from '@/features/mypage-attendance/ui';

import { mockAttendanceRecords } from '@/shared/mock/mypage-attendance';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from '../styles/AttendancePage.css';

export function AttendancePage() {
  const { pop } = useFlow();

  const handleBack = () => {
    pop();
  };

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
                  icon={<CheckIcon size={24} color="primary" />}
                  label="이번 달 출석"
                  value="24"
                />
                <MypageStatCard
                  icon={<CoinsStackedIcon size={24} color="primary" />}
                  label="획득 포인트"
                  value="2,400"
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
