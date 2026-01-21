import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const imageContainer = style({
  position: 'relative',
  width: '100vw',
  height: '375px',
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
});

export const imageCounter = style({
  position: 'absolute',
  left: '50%',
  top: '331px',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  height: '24px',
  padding: '2px 10px',
  borderRadius: '4px',
  backgroundColor: vars.colors.gray50,
  fontSize: vars.typography.body.b4.fontSize,
  fontWeight: vars.typography.body.b4.fontWeight,
  lineHeight: vars.typography.body.b4.lineHeight,
  color: vars.colors.white,
});
