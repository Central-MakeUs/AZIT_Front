import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
  backgroundColor: vars.colors.white,
  position: 'relative',
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
  gap: '36px',
  backgroundColor: '#F9FAFB',
  padding: '20px',
  marginTop: '40px',
  minHeight: '509px',
});

export const footerWrapper = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
  width: '100%',
  backgroundColor: vars.colors.white,
  paddingLeft: '20px',
  paddingRight: '20px',
  paddingTop: '10px',
  paddingBottom: '10px',
  zIndex: 100,
});
