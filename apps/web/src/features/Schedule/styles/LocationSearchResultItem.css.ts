import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  width: '100%',
  cursor: 'pointer',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  width: '100%',
});

export const nameRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const nameWrapper = style([
  typography.body.b2,
  {
    display: 'flex',
    alignItems: 'center',
  },
]);

export const keyword = style({
  color: vars.colors.blue60,
});

export const nameSuffix = style({
  color: vars.colors.black,
});

export const category = style([
  typography.body.b3,
  {
    color: vars.colors.gray40,
    flexShrink: 0,
  },
]);

export const address = style([
  typography.body.b3,
  {
    color: vars.colors.gray50,
    width: '100%',
  },
]);
