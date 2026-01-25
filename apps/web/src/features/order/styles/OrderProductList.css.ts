import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const productList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
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

export const itemsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  width: '100%',
});
