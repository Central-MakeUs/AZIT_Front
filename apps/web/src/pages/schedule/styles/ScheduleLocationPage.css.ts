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

export const mapContainer = style({
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflowY: 'hidden',
  position: 'relative',
});

export const mapDescription = style([
  typography.heading.h3,
  {
    color: vars.colors.black,
    padding: '8px 24px 0',
    flexShrink: 0,
    whiteSpace: 'pre-line',
  },
]);

export const mapArea = style({
  flex: 1,
  minHeight: 0,
  width: '100%',
  backgroundColor: vars.colors.background_sub,
});

export const footerWrapper = style([
  layoutStyles.footerWrapper,
  {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '10px 20px 20px',
    backgroundColor: 'transparent',
  },
]);

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
