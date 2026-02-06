import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';
import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: vars.colors.background,
    gap: '20px',
    padding: '12px 20px',
    boxSizing: 'border-box',
  },
]);

export const footerWrapper = style([layoutStyles.footerWrapper]);

export const shareButton = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
