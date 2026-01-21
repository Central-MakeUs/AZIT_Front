import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

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

export const brandName = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.black,
  width: '100%',
});

export const productName = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.black,
  width: '100%',
});

export const priceContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '130px',
});

export const originalPrice = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.gray50,
  textDecoration: 'line-through',
  width: '100%',
});

export const discountContainer = style({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  width: '100%',
});

export const discountRate = style({
  fontSize: vars.typography.heading.h3.fontSize,
  fontWeight: vars.typography.heading.h3.fontWeight,
  lineHeight: vars.typography.heading.h3.lineHeight,
  color: vars.colors.blue60,
});

export const discountedPrice = style({
  fontSize: vars.typography.heading.h3.fontSize,
  fontWeight: vars.typography.heading.h3.fontWeight,
  lineHeight: vars.typography.heading.h3.lineHeight,
  color: vars.colors.black,
});
