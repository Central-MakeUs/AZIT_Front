import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const itemContainer = style({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
});

export const imageWrapper = style({
  width: '100%',
  height: '162px',
  backgroundColor: vars.colors.gray10,
  borderRadius: '8px',
  flexShrink: 0,
});

export const infoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-start',
  width: '100%',
  padding: '4px 4px 8px 4px',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
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
  fontSize: vars.typography.body.b4.fontSize,
  fontWeight: vars.typography.body.b4.fontWeight,
  lineHeight: vars.typography.body.b4.lineHeight,
  color: vars.colors.black,
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const priceContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '102px',
});

export const originalPrice = style({
  fontSize: vars.typography.body.b4.fontSize,
  fontWeight: vars.typography.body.b4.fontWeight,
  lineHeight: vars.typography.body.b4.lineHeight,
  color: vars.colors.gray40,
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
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.blue60,
});

export const discountedPrice = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.black,
});
