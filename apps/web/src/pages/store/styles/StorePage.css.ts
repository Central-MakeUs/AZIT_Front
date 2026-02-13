import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([
  layoutStyles.headerWrapper,
  {
    position: 'relative',
    zIndex: 50,
  },
]);

export const cartIconWrapper = style({
  width: '24px',
  height: '24px',
  overflow: 'visible',
  position: 'relative',
  flexShrink: 0,
  cursor: 'pointer',
  zIndex: 1,
});
