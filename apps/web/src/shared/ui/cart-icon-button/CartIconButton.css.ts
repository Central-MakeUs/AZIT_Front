import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const button = style({
  position: 'relative',
  width: '24px',
  height: '24px',
  overflow: 'visible',
  flexShrink: 0,
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  padding: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const badge = style({
  position: 'absolute',
  top: '-4px',
  right: '-4px',
  minWidth: '14px',
  height: '14px',
  padding: '0 4px',
  borderRadius: '50%',
  backgroundColor: vars.colors.error,
  color: vars.colors.white,
  fontSize: '10px',
  fontWeight: 600,
  lineHeight: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
