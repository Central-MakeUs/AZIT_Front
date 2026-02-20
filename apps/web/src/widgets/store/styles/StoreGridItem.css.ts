import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const itemContainer = style({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  minWidth: 0,
  maxWidth: '100%',
  gridColumn: 'span 1 / span 1',
  boxSizing: 'border-box',
});

export const imageWrapper = style({
  position: 'relative',
  width: '100%',
  height: '162px',
  backgroundColor: vars.colors.gray10,
  borderRadius: '8px',
  flexShrink: 0,
  overflow: 'hidden',
});

export const thumbnailImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const infoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-start',
  width: '100%',
  minWidth: 0,
  padding: '4px 4px 8px 4px',
  boxSizing: 'border-box',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  alignItems: 'flex-start',
  width: '100%',
  minWidth: 0,
});

export const brandName = style([
  typography.body.b3,
  {
    color: vars.colors.black,
    width: '100%',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
]);

export const productName = style([
  typography.body.b4,
  {
    color: vars.colors.black,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
]);

export const priceContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
});

export const originalPrice = style([
  typography.body.b4,
  {
    color: vars.colors.gray40,
    textDecoration: 'line-through',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
]);

export const discountContainer = style({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  width: '100%',
});

export const discountRate = style([
  typography.body.b2,
  {
    color: vars.colors.blue60,
  },
]);

export const discountedPrice = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
]);
