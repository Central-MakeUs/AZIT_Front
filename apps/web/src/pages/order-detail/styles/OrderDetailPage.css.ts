import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: vars.colors.background,
    gap: '20px',
    padding: '16px',
    boxSizing: 'border-box',
    paddingBottom: '120px',
  },
]);

export const buttonContainer = style({
  display: 'flex',
  marginTop: '12px',
  gap: '10px',
  width: '100%',
});
