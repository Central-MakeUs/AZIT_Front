import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const infoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'flex-start',
  width: '249px',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-start',
  width: '100%',
});

export const brandName = style([
  typography.body.b3,
  {
    color: vars.colors.black,
    width: '100%',
  },
]);

export const productName = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    width: '100%',
  },
]);

export const priceContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '130px',
});

export const originalPrice = style([
  typography.body.b2,
  {
    color: vars.colors.gray50,
    textDecoration: 'line-through',
    width: '100%',
  },
]);

export const discountContainer = style({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  width: '100%',
});

export const discountRate = style([
  typography.heading.h3,
  {
    color: vars.colors.blue60,
  },
]);

export const discountedPrice = style([
  typography.heading.h3,
  {
    color: vars.colors.black,
  },
]);
