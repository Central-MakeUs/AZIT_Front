import { vars } from '@azit/design-system';
import { keyframes, style } from '@vanilla-extract/css';

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
});

const skeletonBase = style({
  backgroundColor: vars.colors.gray10,
  opacity: 0.2,
  borderRadius: '4px',
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

export const listContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
});

export const itemContainer = style({
  display: 'flex',
  gap: '16px',
  width: '100%',
  padding: '16px',
  backgroundColor: vars.colors.white,
  borderRadius: '16px',
  border: `1px solid ${vars.colors.gray10}`,
});

export const dateBlock = style([
  skeletonBase,
  {
    width: '44px',
    height: '44px',
    flexShrink: 0,
  },
]);

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1,
  minWidth: 0,
});

export const tagsRow = style({
  display: 'flex',
  gap: '4px',
  flexWrap: 'wrap',
});

export const tagLine = style([
  skeletonBase,
  {
    width: '52px',
    height: '24px',
  },
]);

export const titleLine = style([
  skeletonBase,
  {
    width: '80%',
    height: '16px',
  },
]);

export const detailsRow = style({
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
});

export const detailLine = style([
  skeletonBase,
  {
    width: '64px',
    height: '14px',
  },
]);
