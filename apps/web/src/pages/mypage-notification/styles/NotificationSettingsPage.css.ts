import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const header = style({
  backgroundColor: vars.colors.background_sub,
});

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    padding: '20px',
  },
]);
