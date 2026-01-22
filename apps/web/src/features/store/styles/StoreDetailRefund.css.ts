import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const container = style({
  display: 'flex',
  gap: '17px',
  alignItems: 'flex-start',
});

export const label = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.gray50,
  flexShrink: 0,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '162px',
});

export const text = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.black,
  width: '100%',
});
