import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

import { layoutStyles } from '@/shared/styles/layout.css';

export const headerWrapper = style([layoutStyles.headerWrapper]);

export const mainContainer = style([
  layoutStyles.mainContainer,
  {
    backgroundColor: 'transparent',
    paddingBottom: '40px',
  },
]);

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '16px 20px',
  alignItems: 'center',
  width: '100%',
});

export const profileSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  alignItems: 'center',
  width: '100%',
});

export const profileTop = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  alignItems: 'center',
  width: '100%',
});

export const avatarWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  alignItems: 'center',
  width: 141,
});

export const avatar = style({
  width: 96,
  height: 96,
  borderRadius: '50%',
  objectFit: 'cover',
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
});

export const profileInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  alignItems: 'center',
});

export const crewName = style([
  typography.body.b1,
  {
    color: vars.colors.black,
    textAlign: 'center',
  },
]);

export const inviteCard = style({
  width: '100%',
  backgroundColor: vars.colors.white,
  borderRadius: 16,
  height: 56,
  overflow: 'hidden',
  display: 'flex',
  position: 'relative',
});

export const inviteCardLeft = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  cursor: 'pointer',
});

export const inviteCode = style([
  typography.body.b3,
  {
    color: vars.colors.blue80,
  },
]);

export const divider = style({
  width: 1,
  height: 24,
  backgroundColor: vars.colors.gray20,
  alignSelf: 'center',
  flexShrink: 0,
});

export const inviteCardRight = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  cursor: 'pointer',
});

export const shareText = style([
  typography.body.b3,
  {
    color: vars.colors.gray70,
  },
]);

export const menuSectionWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: '100%',
});

export const dissolveInputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  width: '100%',
});

export const dissolveInputGuide = style([
  typography.body.b3,
  {
    color: vars.colors.error,
    textAlign: 'center',
  },
]);

export const reissueCodeGuide = style([
  typography.body.b3,
  {
    color: vars.colors.blue80,
    textAlign: 'center',
  },
]);

export const reissueCodeBox = style({
  width: '100%',
  backgroundColor: vars.colors.white,
  border: `0.5px solid ${vars.colors.gray20}`,
  borderRadius: 12,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
});

export const reissueCodeText = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const dissolveButton = style([
  typography.body.b4,
  {
    width: '100%',
    textAlign: 'center',
    color: vars.colors.gray50,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
]);
