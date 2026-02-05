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
  backgroundColor: vars.colors.white,
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const brandListWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 20px',
});

export const summaryWrapper = style({
  marginTop: 20,
  paddingBottom: 20,
});

export const ctaButton = style({
  width: '100%',
});
