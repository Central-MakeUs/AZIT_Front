export interface ScheduleItem {
  id: string;
  month: string;
  day: string;
  tags: {
    label: string;
    type: 'primary' | 'secondary';
  }[];
  title: string;
  time: string;
  location: string;
  participants: {
    current: number;
    max: number;
  };
}

export const mockScheduleList: ScheduleItem[] = [
  {
    id: '1',
    month: '1월',
    day: '21일',
    tags: [
      { label: '정기런', type: 'primary' },
      { label: '5km', type: 'secondary' },
      { label: '4\'30"/km', type: 'secondary' },
    ],
    title: 'Run Title Run Title Run Title Run Title',
    time: '19:30',
    location: '반포 한강 공원',
    participants: {
      current: 12,
      max: 20,
    },
  },
  {
    id: '2',
    month: '1월',
    day: '22일',
    tags: [
      { label: '정기런', type: 'primary' },
      { label: '10km', type: 'secondary' },
      { label: '5\'00"/km', type: 'secondary' },
    ],
    title: 'Run Title Run Title Run Title Run Title',
    time: '20:00',
    location: '반포 한강 공원',
    participants: {
      current: 8,
      max: 15,
    },
  },
  {
    id: '3',
    month: '1월',
    day: '23일',
    tags: [
      { label: '정기런', type: 'primary' },
      { label: '3km', type: 'secondary' },
      { label: '4\'00"/km', type: 'secondary' },
    ],
    title: 'Run Title Run Title Run Title Run Title',
    time: '18:30',
    location: '반포 한강 공원',
    participants: {
      current: 15,
      max: 20,
    },
  },
];

export interface ActivityActivation {
  title: string;
  activationText: string;
  distanceText: string;
}

export const mockActivityActivation: ActivityActivation = {
  title: '반포 한강 나이트 런',
  activationText: '출석하기',
  distanceText: '100m이내에서 활성화',
};
