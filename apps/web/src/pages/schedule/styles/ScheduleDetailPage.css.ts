import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const pageContainer = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: vars.colors.background,
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '12px 20px',
  width: '100%',
  boxSizing: 'border-box',
});

export const bottomBar = style({
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: vars.colors.white,
  padding: '20px',
  width: '100%',
  boxSizing: 'border-box',
});

export const shareButton = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
