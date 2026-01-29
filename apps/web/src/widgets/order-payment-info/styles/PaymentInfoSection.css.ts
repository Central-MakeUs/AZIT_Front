import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const title = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    fontWeight: '600',
  },
]);

export const detailsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

export const detailRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const detailLabel = style([
  typography.body.b3,
  {
    color: vars.colors.gray50,
  },
]);

export const detailValue = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const discountRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  color: vars.colors.blue60,
});

export const discountLabel = style([typography.body.b3]);

export const discountValue = style([typography.body.b2]);

export const divider = style({
  width: '100%',
  height: '1px',
  backgroundColor: vars.colors.gray10,
});

export const totalRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  color: vars.colors.black,
});

export const totalLabel = style([typography.body.b2]);

export const totalValue = style([
  typography.heading.h3,
  {
    fontWeight: '600',
  },
]);
