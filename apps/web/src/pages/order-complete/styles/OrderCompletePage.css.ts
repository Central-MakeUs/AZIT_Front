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

export const iconButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
});

export const headerSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '40px',
  width: '100%',
});

export const infoSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  backgroundColor: vars.colors.background_sub,
  padding: '20px',
  marginTop: '40px',
  minHeight: '509px',
});

export const footerWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: vars.colors.white,
  padding: '0 20px',
  paddingTop: '20px',
  paddingBottom: '20px',
});
