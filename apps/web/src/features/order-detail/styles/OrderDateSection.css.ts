import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
});

export const date = style([
  typography.body.b1,
  {
    color: vars.colors.black,
  },
]);

export const orderNumber = style([
  typography.body.b3,
  {
    color: vars.colors.gray50,
  },
]);

export const divider = style({
  width: '100%',
  height: '1px',
  backgroundColor: vars.colors.gray10,
  marginTop: '16px',
});
