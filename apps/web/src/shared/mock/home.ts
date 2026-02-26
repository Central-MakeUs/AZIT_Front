import type { ScheduleList } from '@/entities/schedule/model/schedule.types';

export const mockScheduleList: ScheduleList = [
  {
    scheduleId: 1,
    title: 'Run Title Run Title Run Title Run Title',
    runType: 'REGULAR',
    meetingAt: '2025-01-21T19:30:00.000Z',
    placeName: '반포 한강 공원',
    distance: 5,
    pace: 4.5,
    maxParticipants: 20,
    currentParticipants: 12,
    isMine: false,
    isParticipating: false,
    createdAt: '2025-01-15T09:00:00.000Z',
    status: 'ACTIVE',
  },
  {
    scheduleId: 2,
    title: 'Run Title Run Title Run Title Run Title',
    runType: 'REGULAR',
    meetingAt: '2025-01-22T20:00:00.000Z',
    placeName: '반포 한강 공원',
    distance: 10,
    pace: 5,
    maxParticipants: 15,
    currentParticipants: 8,
    isMine: false,
    isParticipating: false,
    createdAt: '2025-01-16T09:00:00.000Z',
    status: 'ACTIVE',
  },
  {
    scheduleId: 3,
    title: 'Run Title Run Title Run Title Run Title',
    runType: 'REGULAR',
    meetingAt: '2025-01-23T18:30:00.000Z',
    placeName: '반포 한강 공원',
    distance: 3,
    pace: 4,
    maxParticipants: 20,
    currentParticipants: 15,
    isMine: false,
    isParticipating: false,
    createdAt: '2025-01-17T09:00:00.000Z',
    status: 'ACTIVE',
  },
];

export interface ActivityActivation {
  title: string;
  activationText: string;
  distanceText: string;
  isLightningRun?: boolean;
}

export const mockActivityActivation: ActivityActivation = {
  title: '반포 한강 나이트 런',
  activationText: '출석하기',
  distanceText: '100m이내에서 활성화',
  isLightningRun: true,
};
