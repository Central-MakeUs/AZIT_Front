import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    padding: '20px',
    gap: '20px',
    alignItems: 'center',
  },
]);

export const profileImageWrapper = style({
  display: 'inline-grid',
  gridTemplateColumns: 'max-content',
  gridTemplateRows: 'max-content',
  flexShrink: 0,
  position: 'relative',
});

export const profileImage = style({
  gridColumn: '1',
  gridRow: '1',
});

export const editBadgeWrapper = style({
  gridColumn: '1',
  gridRow: '1',
  display: 'inline-grid',
  gridTemplateColumns: 'max-content',
  gridTemplateRows: 'max-content',
  marginLeft: '64px',
  marginTop: '64px',
});

export const editBadgeOuter = style({
  gridColumn: '1',
  gridRow: '1',
  width: '32px',
  height: '32px',
  borderRadius: '100%',
  backgroundColor: vars.colors.white,
  border: `2px solid ${vars.colors.white}`,
});

export const editBadgeInner = style({
  gridColumn: '1',
  gridRow: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '100%',
  backgroundColor: vars.colors.blue70,
  overflow: 'hidden',
  color: vars.colors.white,
});

export const nicknameSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

export const nicknameLabel = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    paddingLeft: '4px',
  },
]);

export const counterWrapper = style({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: '8px',
});

export const counter = style([
  typography.body.b3,
  {
    color: vars.colors.gray50,
    textAlign: 'right',
  },
]);

export const footerWrapper = style([
  layoutStyles.footerWrapper,
  {
    gap: '4px',
    paddingBottom: '0',
  },
]);
