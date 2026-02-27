import { vars } from '@azit/design-system';
import { CheckCircleBrokenIcon, MarkerPinIcon } from '@azit/design-system/icon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'motion/react';

import * as styles from '@/widgets/schedule-attendance/styles/ScheduleAttendanceSection.css';
import { ScheduleAttendanceSkeleton } from '@/widgets/skeleton/ui';

import { memberQueries, scheduleQueries } from '@/shared/queries';
import { toastSuccess } from '@/shared/ui/toast';

import { useWithinRadius } from '../model/useWithinRadius';

import type { ScheduleCheckInStatusResponse } from '@/entities/schedule/model/schedule.model';

export function ScheduleAttendanceSection({
  checkInStatus,
  isCheckInStatusPending,
}: {
  checkInStatus: ScheduleCheckInStatusResponse | null | undefined;
  isCheckInStatusPending: boolean;
}) {
  const queryClient = useQueryClient();

  const todayInfo = checkInStatus?.todayScheduleInfo;
  const isCheckedIn = todayInfo?.isCheckedIn === true;
  const isAvailableTime = todayInfo?.isAvailableTime === true;

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

  const { isWithinRadius, userPosition } = useWithinRadius(
    todayInfo?.latitude,
    todayInfo?.longitude,
    !!todayInfo && isAvailableTime
  );

  const handleCheckIn = () => {
    if (!todayInfo?.scheduleId) return;
    if (!userPosition?.lat || !userPosition?.lng) return;
    scheduleCheckInMutation.mutate({
      scheduleId: todayInfo.scheduleId,
      payload: {
        latitude: userPosition.lat,
        longitude: userPosition.lng,
      },
    });
  };

  if (isCheckInStatusPending) return <ScheduleAttendanceSkeleton />;
  if (!checkInStatus) {
    return <ScheduleDisabledSection title="참여할 일정이 없어요" />;
  }

  if (checkInStatus.hasScheduleToday && todayInfo) {
    const canCheckIn = isWithinRadius && !isCheckedIn && isAvailableTime;
    const showDisabledByTimeOrDistance =
      !isCheckedIn && (!isAvailableTime || !isWithinRadius);

    if (canCheckIn) {
      return (
        <ScheduleActivatedSection
          isCheckedIn={false}
          runType={todayInfo.runType ?? 'REGULAR'}
          title={todayInfo.title ?? ''}
          onCheckIn={handleCheckIn}
        />
      );
    }
    if (showDisabledByTimeOrDistance) {
      return <ScheduleDisabledSection title={todayInfo.title} />;
    }
    if (isCheckedIn) {
      return (
        <ScheduleActivatedSection
          isCheckedIn
          runType={todayInfo.runType}
          title={todayInfo.title ?? ''}
          onCheckIn={() => {}}
        />
      );
    }
  }

  const daysLeft = checkInStatus.nextScheduleInfo?.daysLeft;

  if (typeof daysLeft === 'number' && daysLeft > 0) {
    return (
      <ScheduleDisabledSection title={`다음 일정까지 ${daysLeft}일 남았어요`} />
    );
  }

  return <ScheduleDisabledSection title="참여할 일정이 없어요" />;
}

function ScheduleActivatedSection({
  runType,
  title,
  onCheckIn,
  isCheckedIn,
}: {
  runType: 'REGULAR' | 'LIGHTNING';
  title: string;
  onCheckIn: () => void;
  isCheckedIn: boolean;
}) {
  const isLightningRun = runType === 'LIGHTNING';

  return (
    <div
      className={
        isLightningRun ? styles.cardContainerLightning : styles.cardContainer
      }
    >
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.buttonWrapper}>
        <div className={styles.rippleContainer}>
          <motion.div
            className={
              isLightningRun
                ? styles.rippleCircleOuterLightning
                : styles.rippleCircleOuter
            }
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.05, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className={
              isLightningRun
                ? styles.rippleCircleMiddleLightning
                : styles.rippleCircleMiddle
            }
            animate={{
              scale: [0.9, 1.0, 0.9],
              opacity: [0.3, 0.15, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.3,
              ease: 'easeInOut',
            }}
          />
          <div
            className={
              isLightningRun ? styles.buttonOuterLightning : styles.buttonOuter
            }
          >
            <button
              className={
                isLightningRun ? styles.buttonLightning : styles.button
              }
              type="button"
              onClick={onCheckIn}
            >
              <div className={styles.buttonContent}>
                <div className={styles.iconWrapper}>
                  {isCheckedIn ? (
                    <CheckCircleBrokenIcon
                      size={48}
                      style={{ color: 'white' }}
                    />
                  ) : (
                    <MarkerPinIcon size={48} style={{ color: 'white' }} />
                  )}
                </div>
                <span className={styles.buttonText}>
                  {isCheckedIn ? '출석 완료' : '출석하기'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <p className={styles.distanceText}>100m이내에서 활성화</p>
    </div>
  );
}

function ScheduleDisabledSection({ title }: { title: string }) {
  return (
    <div className={styles.disabledCardContainer}>
      <h2 className={styles.titleDisabled}>{title}</h2>
      <div className={styles.buttonWrapper}>
        {/* <div className={styles.rippleContainer}>
          <div className={styles.buttonOuterDisabled}>
            <button className={styles.buttonDisabled} type="button" disabled>
              <div className={styles.buttonContent}>
                <div className={styles.iconWrapperDisabled}>
                  <MarkerPinIcon
                    size={48}
                    aria-hidden
                    style={{ color: vars.colors.gray60 }}
                  />
                </div>
                <span className={styles.buttonTextDisabled}>출석하기</span>
              </div>
            </button>
          </div>
        </div> */}
        <div className={styles.rippleContainer}>
          <motion.div
            className={styles.rippleCircleOuterDisabled}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.05, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className={styles.rippleCircleMiddleDisabled}
            animate={{
              scale: [0.9, 1.0, 0.9],
              opacity: [0.3, 0.15, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.3,
              ease: 'easeInOut',
            }}
          />
          <div className={styles.buttonOuter}>
            <button className={styles.buttonDisabled} type="button">
              <div className={styles.buttonContent}>
                <div className={styles.iconWrapperDisabled}>
                  <MarkerPinIcon
                    size={48}
                    aria-hidden
                    style={{ color: vars.colors.gray60 }}
                  />
                </div>
                <span className={styles.buttonTextDisabled}>출석하기</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <p className={styles.distanceTextDisabled}>100m이내에서 활성화</p>
    </div>
  );
}
