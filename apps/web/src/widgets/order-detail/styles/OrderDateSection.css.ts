import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const section = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
});

export const dateColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
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

export const orderStatus = style([
  typography.body.b2,
  {
    color: vars.colors.blue60,
  },
]);
