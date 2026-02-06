import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';
import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: vars.colors.white,
  },
]);

export const brandListWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 20px',
});

export const summaryWrapper = style({
  marginTop: 20,
  paddingBottom: 20,
});

export const ctaButton = style({
  width: '100%',
});
