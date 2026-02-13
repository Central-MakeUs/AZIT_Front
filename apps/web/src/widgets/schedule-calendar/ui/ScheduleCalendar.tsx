import { ChevronLeftIcon, ChevronRightIcon } from '@azit/design-system/icon';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import '@/widgets/schedule-calendar/style/ScheduleCalendarBase.css.ts';

import * as styles from '@/widgets/schedule-calendar/style/ScheduleCalendar.css.ts';

interface ScheduleCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  activeStartDate: Date;
  onActiveStartDateChange: (date: Date) => void;
}

export function ScheduleCalendar({
  value,
  onChange,
  activeStartDate,
  onActiveStartDateChange,
}: ScheduleCalendarProps) {
  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeaderSection}>
        <button className={styles.calendarHeaderButton}>
          <ChevronLeftIcon size={24} />
        </button>
        <span className={styles.calendarTitle}>
          {dayjs(activeStartDate).format('YYYY년 M월')}
        </span>
        <button className={styles.calendarHeaderButton}>
          <ChevronRightIcon size={24} />
        </button>
      </div>

      <Calendar
        value={value}
        onChange={(value) => {
          if (value instanceof Date) {
            onChange(value);
          }
        }}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            onActiveStartDateChange(activeStartDate);
          }
        }}
        formatShortWeekday={(_, date) =>
          dayjs(date).format('ddd').toUpperCase()
        }
        formatDay={(_, date) => dayjs(date).format('D')}
      />
    </div>
  );
}
