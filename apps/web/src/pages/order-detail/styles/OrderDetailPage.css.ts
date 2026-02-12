import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';
import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: vars.colors.background,
    gap: '16px',
    padding: '16px',
    boxSizing: 'border-box',
  },
]);
