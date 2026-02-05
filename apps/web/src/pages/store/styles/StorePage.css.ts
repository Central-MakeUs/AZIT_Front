import { style } from '@vanilla-extract/css';

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
  gap: '20px',
  alignItems: 'flex-start',
  width: '100%',
  padding: '12px 20px',
});

export const bannerSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
});

export const productsSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'flex-start',
  width: '100%',
});

export const cartIconWrapper = style({
  width: '24px',
  height: '24px',
  overflow: 'hidden',
  position: 'relative',
  flexShrink: 0,
  cursor: 'pointer',
});
