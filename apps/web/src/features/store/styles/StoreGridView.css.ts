import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    gap: '20px',
    alignItems: 'flex-start',
    padding: '12px 20px',
  },
]);

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
  marginBottom: '100px',
});
