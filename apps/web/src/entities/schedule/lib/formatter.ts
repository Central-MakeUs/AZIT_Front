import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const formatRunType = (runType?: string) => {
  return runType === 'REGULAR' ? '정기런' : '번개런';
};

export const formatDistance = (distance: number) => {
  return `${distance}km`;
};

export const formatPace = (pace: number) => {
  const min = Math.floor(pace);
  const sec = Math.round((pace - min) * 60);
  return `${min}'${sec.toString().padStart(2, '0')}"`;
};

export const formatMeetTime = (meetingAt: string) => {
  const d = dayjs(meetingAt);

  if (!d.isValid()) {
    return { date: '', time: '' };
  }

  return {
    date: d.locale('ko').format('YYYY.M.D(ddd)'),
    time: d.format('HH:mm'),
  };
};

export const formatMeetingListDate = (meetingAt?: string) => {
  if (!meetingAt) return { month: '', day: '', time: '' };

  const d = dayjs(meetingAt);

  if (!d.isValid()) {
    return { month: '', day: '', time: '' };
  }

  return {
    month: `${d.month() + 1}월`,
    day: `${d.date()}일`,
    time: d.format('HH:mm'),
  };
};
