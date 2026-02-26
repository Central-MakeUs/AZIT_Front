import { vars } from '@azit/design-system';
import { ChevronLeftIcon, ChevronRightIcon } from '@azit/design-system/icon';
import dayjs from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import '@/widgets/schedule-calendar/style/ScheduleCalendarBase.css.ts';

import * as styles from '@/widgets/schedule-calendar/style/ScheduleCalendar.css.ts';

import { formatDate } from '@/shared/lib/formatters';
import { useCalendar } from '@/shared/lib/useCalendar';
import type { ScheduleCalendarItem } from '@/shared/types/schedule';

interface ScheduleCalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  explicitViewDate?: Date;
  onChangeExplicitViewDate?: Dispatch<SetStateAction<Date>>;
  scheduleData?: ScheduleCalendarItem[];
  isPastDateDisabled?: boolean;
}

export function ScheduleCalendar({
  value,
  onChange,
  scheduleData,
  isPastDateDisabled = false,
  explicitViewDate,
  onChangeExplicitViewDate,
}: ScheduleCalendarProps) {
  const { viewDate, setViewDate } = useCalendar();

  const handleViewDateChange = (date: Date) => {
    if (onChangeExplicitViewDate) onChangeExplicitViewDate(date);
    else setViewDate(date);
  };

  const handlePreviousMonth = () => {
    handleViewDateChange(
      dayjs(explicitViewDate ?? viewDate)
        .subtract(1, 'month')
        .toDate()
    );
  };
  const handleNextMonth = () => {
    handleViewDateChange(
      dayjs(explicitViewDate ?? viewDate)
        .add(1, 'month')
        .toDate()
    );
  };

  const activeStartDate = dayjs(explicitViewDate ?? viewDate)
    .startOf('month')
    .toDate();

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeaderSection}>
        <span className={styles.calendarTitle}>
          {formatDate(activeStartDate, 'YYYY년 M월')}
        </span>
        <div className={styles.calendarButtonWrapper}>
          <button
            className={styles.calendarHeaderButton}
            onClick={handlePreviousMonth}
            type="button"
          >
            <ChevronLeftIcon size={24} style={{ color: vars.colors.blue80 }} />
          </button>
          <button
            className={styles.calendarHeaderButton}
            onClick={handleNextMonth}
            type="button"
          >
            <ChevronRightIcon size={24} style={{ color: vars.colors.blue80 }} />
          </button>
        </div>
      </div>

      <Calendar
        value={value ?? undefined}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate: nextStart }) => {
          if (nextStart && onChange) onChange(nextStart);
        }}
        onChange={(value) => {
          if (value instanceof Date && onChange) onChange(value);
        }}
        formatShortWeekday={(_, date) => formatDate(date, 'ddd').toUpperCase()}
        formatDay={(_, date) => formatDate(date, 'D')}
        tileClassName={({ date }) => {
          if (dayjs(date).isBefore(dayjs().startOf('day'))) {
            return isPastDateDisabled ? styles.pastDateTile : '';
          }
          return '';
        }}
        tileDisabled={({ date }) => {
          if (isPastDateDisabled) {
            return dayjs(date).isBefore(dayjs().startOf('day'));
          }
          return false;
        }}
        tileContent={({ date }: { date: Date }) => {
          const schedule = scheduleData?.find((item) =>
            dayjs(item.date).isSame(date, 'day')
          );
          const hasLightning = schedule?.hasLightning;
          const hasRegular = schedule?.hasRegular;
          return (
            <div className={styles.tileContainer}>
              {hasRegular && <div className={styles.regularTile} />}
              {hasLightning && <div className={styles.lightningTile} />}
            </div>
          );
        }}
      />
    </div>
  );
}
