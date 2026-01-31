import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const header = style({
  backgroundColor: vars.colors.background_sub,
});

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flexGrow: 1,
  overflowY: 'auto',
});

export const contentWrapper = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '20px',
  paddingBottom: 100,
});
