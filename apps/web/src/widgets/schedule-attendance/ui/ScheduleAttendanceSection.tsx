import { vars } from '@azit/design-system';
import { MarkerPinIcon } from '@azit/design-system/icon';
import { useQuery } from '@tanstack/react-query';

import * as styles from '@/widgets/schedule-attendance/styles/ScheduleAttendanceSection.css';

import { scheduleQueries } from '@/shared/queries';

import { useWithinRadius } from '../model/useWithinRadius';

export function ScheduleAttendanceSection() {
  const { data: checkInStatus } = useQuery(
    scheduleQueries.getScheduleCheckInStatusQuery()
  );

  const isWithinRadius = useWithinRadius(
    checkInStatus?.todayScheduleInfo?.latitude ?? 0,
    checkInStatus?.todayScheduleInfo?.longitude ?? 0
  );

  if (!checkInStatus) {
    return <ScheduleDisabledSection title="참여할 일정이 없어요" />;
  }

  if (checkInStatus.hasScheduleToday) {
    if (isWithinRadius) {
      return (
        <ScheduleActivatedSection
          runType={checkInStatus.todayScheduleInfo!.runType!}
          title={checkInStatus.todayScheduleInfo!.title ?? ''}
        />
      );
    }
    return (
      <ScheduleDisabledSection title={checkInStatus.todayScheduleInfo!.title} />
    );
  }

  if (
    checkInStatus.nextScheduleInfo?.daysLeft &&
    checkInStatus.nextScheduleInfo.daysLeft > 0
  ) {
    return (
      <ScheduleDisabledSection
        title={`다음 일정까지 ${checkInStatus.nextScheduleInfo.daysLeft}일 남았어요`}
      />
    );
  }

  return <ScheduleDisabledSection title="참여할 일정이 없어요" />;
}

function ScheduleActivatedSection({
  runType,
  title,
}: {
  runType: 'REGULAR' | 'LIGHTNING';
  title: string;
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
            >
              <div className={styles.buttonContent}>
                <div className={styles.iconWrapper}>
                  <MarkerPinIcon size={48} style={{ color: 'white' }} />
                </div>
                <span className={styles.buttonText}>출석하기</span>
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
        <div className={styles.rippleContainer}>
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
        </div>
      </div>
      <p className={styles.distanceTextDisabled}>100m이내에서 활성화</p>
    </div>
  );
}
