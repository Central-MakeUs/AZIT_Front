import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: 'transparent',
    paddingBottom: '100px',
  },
]);

export const menuSectionWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: '100%',
  padding: '24px 20px 0',
  backgroundColor: 'transparent',
});
