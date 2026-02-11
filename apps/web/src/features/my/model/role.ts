export type MemberRoleType = 'LEADER' | 'MEMBER';

export const MEMBER_ROLE = {
  LEADER: 'LEADER',
  MEMBER: 'MEMBER',
} as const;

export const MEMBER_ROLE_LABEL = {
  [MEMBER_ROLE.LEADER]: '리더',
  [MEMBER_ROLE.MEMBER]: '멤버',
} as const;
