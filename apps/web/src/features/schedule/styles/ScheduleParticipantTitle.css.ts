import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});

export const title = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const count = style([
  typography.body.b2,
  {
    color: vars.colors.blue80,
  },
]);

export const countSuffix = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);
