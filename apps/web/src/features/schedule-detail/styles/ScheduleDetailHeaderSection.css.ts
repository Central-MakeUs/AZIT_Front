import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

export const tagRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px',
});

export const title = style([
  typography.heading.h3,
  {
    color: vars.colors.black,
    width: '100%',
  },
]);

export const leaderRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
});

export const avatar = style({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
});

export const leaderInfo = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
});

export const leaderNickname = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);
