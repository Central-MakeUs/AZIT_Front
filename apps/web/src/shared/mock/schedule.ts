export interface ScheduleParticipant {
  id: string;
  nickname: string;
  profileImageUrl?: string;
}

export interface ScheduleDetail {
  id: string;
  creatorId: string;
  runType: string;
  distance: string;
  pace: string;
  title: string;
  leader: {
    nickname: string;
    profileImageUrl?: string;
  };
  date: string;
  dayOfWeek: string;
  time: string;
  locationName: string;
  address: string;
  description: string;
  preparationItems: string[];
  participants: ScheduleParticipant[];
  participantCount: number;
  maxParticipants: number;
}

export const mockScheduleDetail: ScheduleDetail = {
  id: 'schedule-1',
  creatorId: 'user-leader',
  runType: '정기런',
  distance: '5km',
  pace: '4\'30"/km',
  title: 'Run Title Run Title Run Title Run',
  leader: {
    nickname: '닉네임',
    profileImageUrl: undefined,
  },
  date: '2026.1.21',
  dayOfWeek: '수',
  time: '19:30',
  locationName: '반포 한강 공원',
  address: '서울 서초구 신반포로 11길 40',

  description: `이번 정기런은 반포 한강 공원에서 진행하겠습니다!
19:20에 만나서 가볍게 웜업하겠습니다.
날이 추우니 다들 따듯하게 입고 오세요!`,
  preparationItems: ['러닝화', '물병'],
  participants: Array.from({ length: 8 }, (_, i) => ({
    id: `participant-${i + 1}`,
    nickname: '닉네임',
    profileImageUrl: undefined,
  })),
  participantCount: 12,
  maxParticipants: 20,
};
