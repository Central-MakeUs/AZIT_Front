import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    overflowY: 'hidden',
  },
]);

export const searchWrapper = style({
  flexShrink: 0,
  width: '100%',
  padding: '8px 20px',
  boxSizing: 'border-box',
});

export const searchResultList = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  width: '100%',
  padding: '8px 28px 20px',
  boxSizing: 'border-box',
});

export const locationNameSheetContent = style({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 20,
});

export const locationNameSheetTitle = style([
  typography.body.b1,
  {
    width: '100%',
    color: vars.colors.black,
    marginBottom: 16,
  },
]);

export const locationNameInputWrapper = style({
  width: '100%',
  marginBottom: 16,
});

export const locationNameSheetFooter = style({
  width: '100%',
});
