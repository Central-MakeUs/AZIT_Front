import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const headerWrapper = style({
  flexShrink: 0,
  width: '100%',
});

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
  gap: '16px',
  padding: '16px',
  width: '100%',
  boxSizing: 'border-box',
});
