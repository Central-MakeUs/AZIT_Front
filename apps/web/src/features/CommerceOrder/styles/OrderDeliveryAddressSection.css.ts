import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

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
    fontWeight: '600',
  },
]);

export const addressInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const recipient = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);

export const address = style([
  typography.body.b3,
  {
    color: vars.colors.gray70,
  },
]);

export const deliveryMessage = style([
  typography.body.b3,
  {
    color: vars.colors.gray70,
  },
]);

export const divider = style({
  width: '100%',
  height: '1px',
  backgroundColor: vars.colors.gray10,
  marginTop: '16px',
});
