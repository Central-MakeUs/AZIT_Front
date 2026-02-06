export interface AttendanceRecord {
  id: string;
  date: string; // "1월 21일" 형식
  title: string;
  time: string;
  location: string;
  status: 'attended' | 'attended-alt' | 'absent';
}

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    date: '1월 21일',
    title: 'Run Title Run Title Run',
    time: '19:30',
    location: '반포 한강 공원',
    status: 'attended',
  },
  {
    id: '2',
    date: '1월 20일',
    title: 'Run Title Run Title Run',
    time: '19:30',
    location: '반포 한강 공원',
    status: 'attended-alt',
  },
  {
    id: '3',
    date: '1월 19일',
    title: 'Run Title Run Title Run',
    time: '19:30',
    location: '반포 한강 공원',
    status: 'absent',
  },
];
