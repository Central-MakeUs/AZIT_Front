export type MemberRole = 'LEADER' | 'MEMBER';

export interface MemberManagementItem {
  id: string;
  nickname: string;
  crewMemberRole: MemberRole;
  joinDate: string;
}

export interface MemberRequestItem {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  requestedAt: string;
}

export const mockMemberRequestList: MemberRequestItem[] = [
  {
    memberId: 1,
    nickname: '닉네임',
    profileImageUrl: '',
    requestedAt: '2026-01-15T09:00:00.000Z',
  },
  {
    memberId: 2,
    nickname: '닉네임',
    profileImageUrl: '',
    requestedAt: '2026-01-15T09:00:00.000Z',
  },
  {
    memberId: 3,
    nickname: '닉네임',
    profileImageUrl: '',
    requestedAt: '2026-01-15T09:00:00.000Z',
  },
  {
    memberId: 4,
    nickname: '닉네임',
    profileImageUrl: '',
    requestedAt: '2026-01-15T09:00:00.000Z',
  },
  {
    memberId: 5,
    nickname: '닉네임',
    profileImageUrl: '',
    requestedAt: '2026-01-15T09:00:00.000Z',
  },
  {
    memberId: 6,
    nickname: '닉네임',
    profileImageUrl: '',
    requestedAt: '2026-01-15T09:00:00.000Z',
  },
];
export const mockMemberRequestCount = mockMemberRequestList.length;

export const mockMemberList: MemberManagementItem[] = [
  {
    id: '1',
    nickname: '닉네임',
    crewMemberRole: 'LEADER',
    joinDate: '2026년 1월 가입',
  },
  {
    id: '2',
    nickname: '닉네임',
    crewMemberRole: 'MEMBER',
    joinDate: '2026년 1월 가입',
  },
  {
    id: '3',
    nickname: '닉네임',
    crewMemberRole: 'MEMBER',
    joinDate: '2026년 1월 가입',
  },
  {
    id: '4',
    nickname: '닉네임',
    crewMemberRole: 'MEMBER',
    joinDate: '2026년 1월 가입',
  },
  {
    id: '5',
    nickname: '닉네임',
    crewMemberRole: 'MEMBER',
    joinDate: '2026년 1월 가입',
  },
  {
    id: '6',
    nickname: '닉네임',
    crewMemberRole: 'MEMBER',
    joinDate: '2026년 1월 가입',
  },
  {
    id: '7',
    nickname: '닉네임',
    crewMemberRole: 'MEMBER',
    joinDate: '2026년 1월 가입',
  },
  {
    id: '8',
    nickname: '닉네임',
    crewMemberRole: 'MEMBER',
    joinDate: '2026년 1월 가입',
  },
  {
    id: '9',
    nickname: '닉네임',
    crewMemberRole: 'MEMBER',
    joinDate: '2026년 1월 가입',
  },
  {
    id: '10',
    nickname: '닉네임',
    crewMemberRole: 'MEMBER',
    joinDate: '2026년 1월 가입',
  },
  {
    id: '11',
    nickname: '닉네임',
    crewMemberRole: 'MEMBER',
    joinDate: '2026년 1월 가입',
  },
];
