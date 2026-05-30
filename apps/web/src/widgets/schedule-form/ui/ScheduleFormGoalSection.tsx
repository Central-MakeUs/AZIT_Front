import { FlagIcon } from '@azit/design-system/icon';
import { memo } from 'react';

import {
  DISTANCE_MAX,
  PACE_MAX,
} from '@/widgets/schedule-form/model/scheduleForm';
import * as styles from '@/widgets/schedule-form/styles/ScheduleForm.css';
import { AccordionItem } from '@/widgets/schedule-form/ui/AccordionItem';

export interface ScheduleFormGoalSectionProps {
  distance: number | null;
  pace: number | null;
  distanceError: boolean;
  paceError: boolean;
  isGoalFilled: boolean;
  open: boolean;
  onToggle: () => void;
  onDistanceChange: (value: string) => void;
  onPaceChange: (value: string) => void;
}

export const ScheduleFormGoalSection = memo(function ScheduleFormGoalSection({
  distance,
  pace,
  distanceError,
  paceError,
  isGoalFilled,
  open,
  onToggle,
  onDistanceChange,
  onPaceChange,
}: ScheduleFormGoalSectionProps) {
  return (
    <AccordionItem
      icon={<FlagIcon size={20} color="default" />}
      label="목표"
      filled={isGoalFilled}
      open={open}
      onToggle={onToggle}
    >
      <div className={styles.verticalSection}>
        <div className={styles.horizontalSection}>
          <label className={styles.label} htmlFor="schedule-distance">
            목표 거리
          </label>
          <div className={styles.unitInputFieldWrapper}>
            <div
              className={
                distanceError
                  ? styles.unitInputWrapperError
                  : styles.unitInputWrapper
              }
            >
              <input
                id="schedule-distance"
                type="text"
                inputMode="numeric"
                className={styles.unitInput}
                value={distance ?? ''}
                onChange={(e) => onDistanceChange(e.target.value)}
                placeholder="0"
              />
              <span className={styles.unitSuffix}>km</span>
            </div>
            {distanceError && (
              <p className={styles.unitInputErrorMessage}>
                최대 값 : {DISTANCE_MAX}
              </p>
            )}
          </div>
        </div>
        <div className={styles.horizontalSection}>
          <label className={styles.label} htmlFor="schedule-pace">
            목표 페이스
          </label>
          <div className={styles.unitInputFieldWrapper}>
            <div
              className={
                paceError
                  ? styles.unitInputWrapperError
                  : styles.unitInputWrapper
              }
            >
              <input
                id="schedule-pace"
                type="text"
                inputMode="numeric"
                className={styles.unitInput}
                value={pace ?? ''}
                onChange={(e) => onPaceChange(e.target.value)}
                placeholder="0"
              />
              <span className={styles.unitSuffix}>분/km</span>
            </div>
            {paceError && (
              <p className={styles.unitInputErrorMessage}>
                최대 값 : {PACE_MAX}
              </p>
            )}
          </div>
        </div>
      </div>
    </AccordionItem>
  );
});
