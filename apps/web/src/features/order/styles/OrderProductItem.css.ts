import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const productItem = style({
  display: 'flex',
  gap: '12px',
  width: '100%',
});

export const productImage = style({
  width: '72px',
  height: '72px',
  borderRadius: '4px',
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
});

export const productInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '251px',
  flexShrink: 0,
});

export const productDetails = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '9px',
  width: '191px',
});

export const productTexts = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
});

export const brandName = style({
  fontSize: vars.typography.body.b4.fontSize,
  fontWeight: vars.typography.body.b4.fontWeight,
  lineHeight: vars.typography.body.b4.lineHeight,
  color: vars.colors.black,
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const productName = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.black,
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const pointsContainer = style({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
});

export const points = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.black,
});

export const quantity = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.gray50,
});

export const priceContainer = style({
  display: 'flex',
  gap: '6px',
  alignItems: 'center',
  paddingLeft: '124px',
  width: '100%',
});

export const originalPrice = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.gray50,
  textDecoration: 'line-through',
  textDecorationSkipInk: 'none',
});

export const discountedPrice = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.black,
});
