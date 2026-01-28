import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
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
