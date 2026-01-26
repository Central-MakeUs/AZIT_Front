import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flexGrow: 1,
  overflowY: 'auto',
  backgroundColor: vars.colors.white,
});

export const contentWrapper = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflowY: 'auto',
});

export const brandListWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 20px',
});

export const divider = style({
  display: 'block',
  width: '100%',
  height: 1,
  minHeight: 1,
  flexShrink: 0,
  backgroundColor: vars.colors.gray10,
});

export const summaryWrapper = style({
  marginTop: 20,
  paddingBottom: 20,
});

export const ctaButton = style({
  width: '100%',
});
