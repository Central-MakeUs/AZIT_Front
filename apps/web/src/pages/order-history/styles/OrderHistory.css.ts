import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: vars.colors.background,
    padding: '20px',
  },
]);

export const dateSection = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '20px 0',
  borderBottom: `1px solid ${vars.colors.gray10}`,
  ':first-child': {
    paddingTop: 0,
  },
  ':last-child': {
    borderBottom: 'none',
    paddingBottom: 0,
  },
});

export const dateSectionHeader = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 12,
});

export const dateLabel = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const detailButton = style([
  typography.body.b4,
  {
    borderRadius: 8,
    border: `1px solid ${vars.colors.blue80}`,
    background: vars.colors.white,
    padding: '6px 12px',
    width: 'fit-content',
    margin: 0,
    height: 'fit-content',
  },
]);

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  width: '100%',
  minHeight: 200,
});

export const emptyStateIconText = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
  width: '100%',
});

export const emptyStateText = style([
  typography.body.b2,
  {
    color: vars.colors.gray60,
    textAlign: 'center',
  },
]);

export const sentinel = style({
  height: 1,
  width: '100%',
});
