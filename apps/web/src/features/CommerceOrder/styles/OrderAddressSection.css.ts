import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const addressSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const title = style({
  fontSize: vars.typography.body.b2.fontSize,
  fontWeight: vars.typography.body.b2.fontWeight,
  lineHeight: vars.typography.body.b2.lineHeight,
  color: vars.colors.black,
});

export const changeButton = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.blue60,
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});

export const addressInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
  maxWidth: '300px',
});

export const recipientInfo = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

export const recipientName = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.black,
});

export const recipientPhone = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.gray70,
});

export const address = style({
  fontSize: vars.typography.body.b3.fontSize,
  fontWeight: vars.typography.body.b3.fontWeight,
  lineHeight: vars.typography.body.b3.lineHeight,
  color: vars.colors.gray70,
  minWidth: '100%',
  width: 'min-content',
  wordBreak: 'break-all',
});

export const dropdownWrapper = style({
  position: 'relative',
  width: '100%',
});
