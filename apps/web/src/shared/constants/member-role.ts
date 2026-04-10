export const MEMBER_ROLE = {
  LEADER: 'LEADER',
  MEMBER: 'MEMBER',
} as const;

export const MEMBER_ROLE_LABEL = {
  [MEMBER_ROLE.LEADER]: '리더',
  [MEMBER_ROLE.MEMBER]: '멤버',
} as const;

export const ROLE_CHIP_TYPE_MAP = {
  [MEMBER_ROLE.LEADER]: 'primary',
  [MEMBER_ROLE.MEMBER]: 'skyblue',
} as const;
