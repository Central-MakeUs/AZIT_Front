import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const container = style({
  display: 'flex',
  gap: 8,
  alignItems: 'flex-start',
  width: '100%',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  flex: 1,
});

export const productInfoRow = style({
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  width: '100%',
});

export const imageWrapper = style({
  position: 'relative',
  width: 72,
  height: 72,
  flexShrink: 0,
  borderRadius: 4,
  backgroundColor: vars.colors.gray10,
  overflow: 'hidden',
});

export const soldOutOverlay = style({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const soldOutText = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);

export const infoWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 9,
  flex: 1,
});

export const titleSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  width: '100%',
});

export const titleRow = style({
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  width: '100%',
});

export const productName = style([
  typography.body.b3,
  {
    flex: 1,
    color: vars.colors.black,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    wordBreak: 'break-all',
  },
]);

export const productNameSoldOut = style({
  color: vars.colors.gray50,
});

export const deleteButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  flexShrink: 0,
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: vars.colors.gray30,
});

export const deliveryInfo = style([
  typography.body.b4,
  {
    color: vars.colors.gray50,
  },
]);

export const sizeText = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const sizeTextSoldOut = style({
  color: vars.colors.gray50,
});

export const bottomRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const priceWrapper = style({
  display: 'flex',
  gap: 6,
  alignItems: 'center',
});

export const originalPrice = style([
  typography.body.b3,
  {
    color: vars.colors.gray50,
    textDecoration: 'line-through',
  },
]);

export const discountedPrice = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const discountedPriceSoldOut = style({
  color: vars.colors.gray50,
});
