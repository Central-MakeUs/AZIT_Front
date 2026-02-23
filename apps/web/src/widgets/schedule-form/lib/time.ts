import type { ScheduleCreateFormValues } from '../model/scheduleCreateForm';

export const clampNum = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};

export const parseHourWithAmPm = (
  raw: string,
  prevAmPm: ScheduleCreateFormValues['amPm']
) => {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return { hour: null as number | null, amPm: prevAmPm };

  let n = parseInt(digits, 10);
  if (Number.isNaN(n)) return { hour: null as number | null, amPm: prevAmPm };

  let amPm = prevAmPm;

  if (n >= 13 && n <= 24) {
    amPm = n === 24 ? 'AM' : 'PM';
    n = n === 24 ? 12 : n - 12;
  } else if (n > 24) {
    n = clampNum(n, 1, 12);
  } else {
    n = clampNum(n, 1, 12);
  }

  return { hour: n as number, amPm };
};
