import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
});

const skeletonBase = style({
  backgroundColor: vars.colors.gray20,
  borderRadius: '4px',
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

export const itemContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
});

export const imageBlock = style([
  skeletonBase,
  {
    width: '100%',
    height: '162px',
  },
]);

export const infoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-start',
  width: '100%',
  padding: '4px 4px 8px 4px',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  alignItems: 'flex-start',
  width: '100%',
});

export const brandNameLine = style([
  skeletonBase,
  {
    width: '40%',
    height: '14px',
  },
]);

export const productNameLine = style([
  skeletonBase,
  {
    width: '100%',
    height: '12px',
  },
]);

export const priceContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'flex-start',
  width: '102px',
});

export const originalPriceLine = style([
  skeletonBase,
  {
    width: '60%',
    height: '12px',
  },
]);

export const discountLine = style([
  skeletonBase,
  {
    width: '80%',
    height: '14px',
  },
]);
