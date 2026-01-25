import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
  padding: '0 20px',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
});

export const sectionTitle = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const priceList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
});

export const priceLabel = style([
  typography.body.b3,
  {
    color: vars.colors.gray50,
  },
]);

export const priceLabelBlue = style([
  typography.body.b3,
  {
    color: vars.colors.blue60,
  },
]);

export const priceValue = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const priceValueBlue = style([
  typography.body.b2,
  {
    color: vars.colors.blue60,
  },
]);

export const totalRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const totalLabel = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const totalValue = style([
  typography.heading.h3,
  {
    color: vars.colors.black,
  },
]);
