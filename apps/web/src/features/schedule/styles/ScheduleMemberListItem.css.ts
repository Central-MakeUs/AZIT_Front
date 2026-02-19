import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const item = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  width: '100%',
});

export const avatar = style({
  width: 48,
  height: 48,
  borderRadius: '50%',
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
});

export const infoRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
});

export const nickname = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);
