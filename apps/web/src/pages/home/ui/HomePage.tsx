import { Header } from '@azit/design-system/header';
// import { BellIcon } from '@azit/design-system/icon';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

// import { useFlow } from '@/app/routes/stackflow';

import {
  POLL_INTERVAL_MS,
  fetchUserPosition,
  isWithinActivationRadius,
  type UserPosition,
} from '@/widgets/schedule-attendance/model/location';
import { ScheduleAttendanceSection } from '@/widgets/schedule-attendance/ui';
import { ScheduleSectionLayout } from '@/widgets/schedule-section-layout/ui';

import { memberQueries } from '@/shared/queries';
import { scheduleQueries } from '@/shared/queries/schedule';
import { scrollContainer } from '@/shared/styles/container.css';
import { logo } from '@/shared/styles/logo.css';
import { AppLayout } from '@/shared/ui/layout';
import { BottomNavigation } from '@/shared/ui/navigation/BottomNavigation';
import { toastSuccess } from '@/shared/ui/toast';

import { ScheduleList } from '@/entities/schedule/ui/ScheduleList';

export function HomePage() {
  // const { push } = useFlow();

  // const handleClick = () => {
  //   push('AlertPage', {});
  // };

  const queryClient = useQueryClient();

  const { data: myInfoData } = useQuery(memberQueries.myInfoQuery());
  const crewId = myInfoData?.result.crewId ?? 0;

  const { data: scheduleList = [], isLoading } = useQuery({
    ...scheduleQueries.getMemberScheduleListQuery(),
    enabled: crewId > 0,
  });

  const { data: checkInStatus, isPending: isCheckInStatusPending } = useQuery(
    scheduleQueries.getScheduleCheckInStatusQuery()
  );

  const todayInfo = checkInStatus?.todayScheduleInfo;
  const isAvailableTime = todayInfo?.isAvailableTime === true;
  const isCheckedIn = todayInfo?.isCheckedIn === true;
  const latitude = todayInfo?.latitude;
  const longitude = todayInfo?.longitude;

  const [userPosition, setUserPosition] = useState<UserPosition | null>(null);
  const [isWithinRadius, setIsWithinRadius] = useState(false);

  const canCheckIn =
    isWithinRadius && !isCheckedIn && !!isAvailableTime && !!todayInfo;

  const scheduleCheckInMutation = useMutation({
    ...scheduleQueries.scheduleCheckInMutation,
    onSuccess: () => {
      toastSuccess('출석이 완료되었습니다');
      queryClient.invalidateQueries({
        queryKey: scheduleQueries.checkInStatusKey(),
      });
      queryClient.invalidateQueries({
        queryKey: memberQueries.myInfoKey(),
      });
    },
  });

  const handleCheckIn = useCallback(() => {
    if (!todayInfo?.scheduleId || !userPosition?.lat || !userPosition?.lng)
      return;
    scheduleCheckInMutation.mutate({
      scheduleId: todayInfo.scheduleId,
      payload: {
        latitude: userPosition.lat,
        longitude: userPosition.lng,
      },
    });
  }, [todayInfo?.scheduleId, userPosition, scheduleCheckInMutation]);

  useEffect(() => {
    const hasScheduleLocation =
      typeof latitude === 'number' && typeof longitude === 'number';
    const shouldPollByMinute =
      !!todayInfo && isAvailableTime && hasScheduleLocation;

    if (!shouldPollByMinute) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;
    let isCancelled = false;

    const updatePositionAndRadius = async () => {
      const position = await fetchUserPosition();
      if (isCancelled) return;

      setUserPosition(position);
      setIsWithinRadius(
        isWithinActivationRadius(position, latitude, longitude)
      );
    };

    updatePositionAndRadius();
    intervalId = setInterval(updatePositionAndRadius, POLL_INTERVAL_MS);

    return () => {
      isCancelled = true;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [latitude, longitude, isAvailableTime, todayInfo]);

  return (
    <AppScreen>
      <AppLayout>
        <Header
          sticky
          left={<h1 className={logo}>AZIT</h1>}
          // right={
          //   <button onClick={handleClick}>
          //     <BellIcon size={24} color="default" />
          //   </button>
          // }
        />
        <div className={scrollContainer}>
          <ScheduleSectionLayout
            topSection={
              <ScheduleAttendanceSection
                checkInStatus={checkInStatus}
                isCheckInStatusPending={isCheckInStatusPending}
                canCheckIn={canCheckIn}
                onCheckIn={handleCheckIn}
              />
            }
            scheduleTitle="내 일정"
            scheduleContent={
              <ScheduleList
                items={scheduleList}
                isHomePage
                isLoading={isLoading}
              />
            }
          />
        </div>
      </AppLayout>
      <BottomNavigation activeTab="home" />
    </AppScreen>
  );
}
