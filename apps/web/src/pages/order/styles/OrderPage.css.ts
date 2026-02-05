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
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  paddingLeft: '20px',
  paddingRight: '20px',
  paddingTop: '20px',
  paddingBottom: '20px',
});

export const divider = style({
  height: '1px',
  backgroundColor: vars.colors.gray10,
  width: '100%',
});

export const ctaButton = style({
  width: '100%',
  height: '54px',
  borderRadius: '16px',
});
