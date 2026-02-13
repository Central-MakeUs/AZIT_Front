import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

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
  objectFit: 'cover',
  objectPosition: 'center',
});

export const productInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flex: 1,
  flexShrink: 0,
  width: '100%',
});

export const productDetails = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '9px',
  width: '100%',
  flex: 1,
  minWidth: 0,
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
  width: 'fit-content',
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
