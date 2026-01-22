import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const categoryButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px 12px',
  borderRadius: '24px',
  backgroundColor: vars.colors.blue80,
  cursor: 'pointer',
});

export const categoryButtonText = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.white,
  textAlign: 'center',
});
