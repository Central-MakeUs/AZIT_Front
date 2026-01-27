import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
  paddingBottom: '120px',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  paddingLeft: '20px',
  paddingRight: '20px',
  paddingTop: '20px',
  paddingBottom: '120px',
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
