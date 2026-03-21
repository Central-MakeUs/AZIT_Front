import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: vars.colors.background_sub,
    padding: 20,
  },
]);

export const totalCount = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    padding: '0 4px',
    marginBottom: 12,
  },
]);

export const loadingMore = style([
  typography.body.b2,
  {
    color: vars.colors.gray70,
    textAlign: 'center',
    padding: 12,
  },
]);

export const sentinel = style({
  height: 1,
  width: '100%',
});

export const pullIndicator = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 8,
  paddingBottom: 8,
  gap: 4,
});

export const pullHint = style([
  typography.body.b2,
  {
    color: vars.colors.gray70,
    textAlign: 'center',
  },
]);

export const pullText = style([
  typography.body.b2,
  {
    color: vars.colors.gray70,
    textAlign: 'center',
  },
]);
