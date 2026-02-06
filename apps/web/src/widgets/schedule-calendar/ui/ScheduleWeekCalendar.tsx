import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import * as styles from '../style/ScheduleWeekCalendar.css.ts';
import '../style/ScheduleCalendarBase.css.ts';

interface ScheduleWeekCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  activeStartDate: Date;
  onActiveStartDateChange: (date: Date) => void;
}

export function ScheduleWeekCalendar({
  value,
  onChange,
  activeStartDate,
  onActiveStartDateChange,
}: ScheduleWeekCalendarProps) {
  const startOfWeek = dayjs(activeStartDate).startOf('week').toDate();
  const endOfWeek = dayjs(activeStartDate).endOf('week').toDate();

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeaderSection}>
        <span className={styles.calendarTitle}>
          {dayjs(activeStartDate).format('YYYY년 M월')}
        </span>
      </div>

      <Calendar
        value={value}
        onChange={(date) => {
          if (date instanceof Date) onChange(date);
        }}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) onActiveStartDateChange(activeStartDate);
        }}
        formatShortWeekday={(_, date) =>
          dayjs(date).format('ddd').toUpperCase()
        }
        formatDay={(_, date) => dayjs(date).format('D')}
        tileDisabled={({ date }) => date < startOfWeek || date > endOfWeek}
      />
    </div>
  );
}
