import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

export const title = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});
