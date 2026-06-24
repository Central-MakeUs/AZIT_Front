export const RUN_TYPE = {
  REGULAR: 'REGULAR',
  LIGHTNING: 'LIGHTNING',
} as const;

export const RUN_TYPE_LABEL = {
  [RUN_TYPE.REGULAR]: '정기런',
  [RUN_TYPE.LIGHTNING]: '번개런',
} as const;

export const RUN_TYPE_CHIP_TYPE_MAP = {
  [RUN_TYPE.REGULAR]: 'primary',
  [RUN_TYPE.LIGHTNING]: 'secondary',
} as const;
