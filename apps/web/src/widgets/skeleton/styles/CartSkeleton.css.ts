import { vars } from '@azit/design-system';
import { keyframes, style } from '@vanilla-extract/css';

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
});

const skeletonBase = style({
  backgroundColor: vars.colors.gray20,
  borderRadius: '4px',
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

export const selectionBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '12px 20px',
});

export const selectionBarLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const selectionCheckbox = style([
  skeletonBase,
  {
    width: 20,
    height: 20,
    flexShrink: 0,
  },
]);

export const selectionTextLine = style([
  skeletonBase,
  {
    width: 80,
    height: 14,
  },
]);

export const selectionDeleteButton = style([
  skeletonBase,
  {
    width: 52,
    height: 18,
  },
]);

export const brandSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
  margin: '20px 0',
  padding: '0 20px',
});

export const brandHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const brandCheckbox = style([
  skeletonBase,
  {
    width: 20,
    height: 20,
    flexShrink: 0,
  },
]);

export const brandNameLine = style([
  skeletonBase,
  {
    width: 100,
    height: 16,
  },
]);

export const itemsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
});

export const cartItemRow = style({
  display: 'flex',
  gap: 8,
  alignItems: 'flex-start',
  width: '100%',
});

export const itemCheckbox = style([
  skeletonBase,
  {
    width: 20,
    height: 20,
    flexShrink: 0,
    marginTop: 2,
  },
]);

export const itemContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  flex: 1,
});

export const itemProductRow = style({
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  width: '100%',
});

export const itemImage = style([
  skeletonBase,
  {
    width: 72,
    height: 72,
    flexShrink: 0,
  },
]);

export const itemInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  flex: 1,
});

export const itemTitleLine = style([
  skeletonBase,
  {
    width: '100%',
    height: 14,
  },
]);

export const itemDeliveryLine = style([
  skeletonBase,
  {
    width: '60%',
    height: 12,
  },
]);

export const itemSizeLine = style([
  skeletonBase,
  {
    width: 40,
    height: 14,
  },
]);

export const itemBottomRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const itemQuantityBlock = style([
  skeletonBase,
  {
    width: 88,
    height: 32,
  },
]);

export const itemPriceLine = style([
  skeletonBase,
  {
    width: 70,
    height: 16,
  },
]);

export const summaryWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
  padding: '0 20px',
  marginTop: 20,
  paddingBottom: 20,
});

export const summarySection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
});

export const summaryTitleLine = style([
  skeletonBase,
  {
    width: 120,
    height: 16,
  },
]);

export const summaryPriceList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
});

export const summaryPriceRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const summaryPriceLabel = style([
  skeletonBase,
  {
    width: 80,
    height: 14,
  },
]);

export const summaryPriceValue = style([
  skeletonBase,
  {
    width: 60,
    height: 14,
  },
]);

export const summaryTotalRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const summaryTotalLabel = style([
  skeletonBase,
  {
    width: 90,
    height: 18,
  },
]);

export const summaryTotalValue = style([
  skeletonBase,
  {
    width: 100,
    height: 20,
  },
]);
