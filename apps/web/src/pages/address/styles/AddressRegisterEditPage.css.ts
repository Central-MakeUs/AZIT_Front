import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';
import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([layoutStyles.mainContainer]);

export const formWrapper = style({
  flex: 1,
  padding: '12px 20px',
});

export const footerWrapper = style([
  layoutStyles.footerWrapper,
  {
    backgroundColor: vars.colors.background_sub,
  },
]);
