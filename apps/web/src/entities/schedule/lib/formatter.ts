import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const formatRunType = (runType?: string) => {
  return runType === 'REGULAR' ? '정기런' : '번개런';
};

export const formatDistance = (distance: number) => {
  return `${distance}km`;
};

export const formatPace = (pace: number) => {
  return `${pace}/km`;
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
