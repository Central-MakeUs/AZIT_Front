import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';
import { layoutStyles } from '@/shared/styles/layout.css';

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
});

const skeletonBase = style({
  backgroundColor: vars.colors.gray20,
  borderRadius: '4px',
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    gap: '12px',
    alignItems: 'center',
  },
]);

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'flex-start',
  width: '100%',
  padding: '0 20px',
});

export const imageBlock = style([
  skeletonBase,
  {
    width: '100vw',
    height: '375px',
    flexShrink: 0,
  },
]);

export const infoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
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
    height: '18px',
  },
]);

export const priceContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'flex-start',
});

export const originalPriceLine = style([
  skeletonBase,
  {
    width: '60%',
    height: '14px',
  },
]);

export const discountLine = style([
  skeletonBase,
  {
    width: '50%',
    height: '16px',
  },
]);

export const detailsSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'flex-start',
  width: '100%',
});

export const bannerLine = style([
  skeletonBase,
  {
    width: '100%',
    height: '48px',
  },
]);

export const detailTextLine = style([
  skeletonBase,
  {
    width: '100%',
    height: '14px',
  },
]);

export const descriptionSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-start',
  width: '100%',
});

export const descriptionTitleLine = style([
  skeletonBase,
  {
    width: '30%',
    height: '16px',
  },
]);

export const descriptionLine = style([
  skeletonBase,
  {
    width: '100%',
    height: '12px',
  },
]);

export const moreInfoPlaceholder = style([
  skeletonBase,
  {
    width: '100vw',
    height: '400px',
    flexShrink: 0,
  },
]);

export const footerWrapper = style([layoutStyles.footerWrapper]);

export const buttonBlock = style([
  skeletonBase,
  {
    width: '100%',
    height: '54px',
  },
]);
