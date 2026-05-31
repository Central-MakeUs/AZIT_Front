import { CalendarIcon } from '@azit/design-system/icon';
import { memo } from 'react';

import * as styles from '@/widgets/schedule-form/styles/ScheduleForm.css';
import { AccordionItem } from '@/widgets/schedule-form/ui/AccordionItem';

export interface ScheduleFormDateTimeSectionProps {
  dateDisplay: string | null;
  timeDisplay: string | null;
  isDateTimeFilled: boolean;
  open: boolean;
  onToggle: () => void;
  onDateClick: () => void;
  onTimeClick: () => void;
}

export const ScheduleFormDateTimeSection = memo(
  function ScheduleFormDateTimeSection({
    dateDisplay,
    timeDisplay,
    isDateTimeFilled,
    open,
    onToggle,
    onDateClick,
    onTimeClick,
  }: ScheduleFormDateTimeSectionProps) {
    return (
      <AccordionItem
        icon={<CalendarIcon size={20} color="default" />}
        label="날짜 및 시간"
        filled={isDateTimeFilled}
        open={open}
        onToggle={onToggle}
      >
        <div className={styles.horizontalSection}>
          <label className={styles.label}>날짜</label>
          <button
            type="button"
            className={
              dateDisplay
                ? styles.timeSelectButton
                : styles.timeSelectButtonPlaceholder
            }
            onClick={onDateClick}
          >
            {dateDisplay ?? '날짜를 선택해 주세요'}
          </button>
        </div>
        <div className={styles.horizontalSection}>
          <label className={styles.label}>시간</label>
          <button
            type="button"
            className={
              timeDisplay
                ? styles.timeSelectButton
                : styles.timeSelectButtonPlaceholder
            }
            onClick={onTimeClick}
          >
            {timeDisplay ?? '시간을 선택해 주세요'}
          </button>
        </div>
      </AccordionItem>
    );
  }
);
