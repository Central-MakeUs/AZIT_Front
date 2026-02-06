import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';
import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    gap: '32px',
    padding: '20px',
  },
]);

export const divider = style({
  height: '1px',
  backgroundColor: vars.colors.gray10,
  width: '100%',
});

export const ctaButton = style({
  width: '100%',
  height: '54px',
  borderRadius: '16px',
});
