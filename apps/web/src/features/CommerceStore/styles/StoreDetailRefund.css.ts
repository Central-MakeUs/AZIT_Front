import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: '17px',
  alignItems: 'flex-start',
});

export const label = style([
  typography.body.b3,
  {
    color: vars.colors.gray50,
    flexShrink: 0,
  },
]);

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '162px',
});

export const text = style([
  typography.body.b3,
  {
    color: vars.colors.black,
    width: '100%',
  },
]);
