import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const headerWrapper = style({
  flexShrink: 0,
  width: '100%',
});

export const header = style({
  backgroundColor: vars.colors.background_sub,
});

export const pageContainer = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '20px',
});
