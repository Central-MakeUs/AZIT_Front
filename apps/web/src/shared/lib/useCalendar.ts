import { useState } from 'react';

export const useCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewDate, setViewDate] = useState<Date>(new Date());

  return {
    selectedDate,
    viewDate,
    setSelectedDate,
    setViewDate,
  };
};
