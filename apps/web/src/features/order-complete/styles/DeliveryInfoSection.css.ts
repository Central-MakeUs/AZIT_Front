import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
});

export const title = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const contentWrapper = style([
  typography.body.b3,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '100%',
  },
]);

export const infoRow = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

export const name = style({
  color: vars.colors.black,
});

export const phone = style({
  color: vars.colors.gray70,
});

export const address = style({
  color: vars.colors.gray70,
  width: '100%',
  minWidth: '100%',
});
