import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const summarySection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

export const summaryContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
});

export const title = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.black,
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const priceItems = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

export const priceItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const priceLabel = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.gray50,
});

export const priceValue = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.black,
});

export const discountItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const discountLabel = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.blue60,
});

export const discountValue = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.blue60,
});

export const divider = style({
  height: '1px',
  backgroundColor: vars.colors.gray10,
  width: '100%',
});

export const totalItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const totalLabel = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.black,
});

export const totalValue = style({
  fontSize: vars.typography.heading.h3.fontSize,
  fontWeight: vars.typography.heading.h3.fontWeight,
  lineHeight: vars.typography.heading.h3.lineHeight,
  color: vars.colors.black,
});
