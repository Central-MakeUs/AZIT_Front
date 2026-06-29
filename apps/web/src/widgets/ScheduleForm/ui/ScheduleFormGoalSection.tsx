import { FlagIcon } from '@azit/design-system/icon';
import { memo } from 'react';

import { DISTANCE_MAX } from '@/widgets/ScheduleForm/model/scheduleForm';
import * as styles from '@/widgets/ScheduleForm/styles/ScheduleForm.css';
import { AccordionItem } from '@/widgets/ScheduleForm/ui/AccordionItem';

import { formatPace } from '@/entities/Schedule/lib/formatter';

export interface ScheduleFormGoalSectionProps {
  distance: number | null;
  pace: number | null;
  distanceError: boolean;
  paceError: boolean;
  isGoalFilled: boolean;
  open: boolean;
  onToggle: () => void;
  onDistanceChange: (value: string) => void;
  onPaceClick: () => void;
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
  onPaceClick,
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
          <div className={styles.fixedWidthInputWrapper160}>
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
          <span className={styles.label}>목표 페이스</span>
          <div className={styles.fixedWidthInputWrapper72}>
            <button
              type="button"
              className={
                paceError ? styles.paceInputButtonError : styles.paceInputButton
              }
              onClick={onPaceClick}
            >
              <span
                className={
                  pace != null ? styles.unitInput : styles.unitInputPlaceholder
                }
              >
                {pace != null ? formatPace(pace) : '5\'00"'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </AccordionItem>
  );
});
