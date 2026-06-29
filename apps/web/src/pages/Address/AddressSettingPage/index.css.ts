import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    padding: '12px 20px',
  },
]);

export const addressListContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
});

export const emptyStateWrapper = style({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: 0,
});

export const footerButtonWrapper = style([
  layoutStyles.footerWrapper,
  {
    gap: 4,
    backgroundColor: vars.colors.background_sub,
  },
]);
