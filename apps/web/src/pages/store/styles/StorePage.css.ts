import { style } from '@vanilla-extract/css';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  padding: '12px 20px',
  paddingBottom: '100px',
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
