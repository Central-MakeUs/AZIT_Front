import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 24,
  flex: 1,
  width: '100%',
  padding: '0 20px',
  paddingBottom: 44,
});

export const profileSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  width: 255,
});

export const profileInfo = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
});

export const crewNameWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
});

export const crewName = style([
  typography.heading.h2,
  {
    color: vars.colors.black,
    textAlign: 'center',
    width: '100%',
  },
]);

export const waitingBadge = style([
  typography.body.b4,
  {
    color: vars.colors.gray60,
    backgroundColor: vars.colors.gray10,
    padding: '2px 8px',
    borderRadius: 8,
    textAlign: 'center',
  },
]);

export const description = style([
  typography.body.b3,
  {
    color: vars.colors.blue80,
    textAlign: 'center',
    width: '100%',
    whiteSpace: 'pre-line',
  },
]);

export const inviteSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
});

export const inviteCodeWrapper = style({
  position: 'relative',
  width: '100%',
  height: 48,
});

export const inviteCodeField = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: 48,
  padding: '10px 16px',
  backgroundColor: vars.colors.white,
  border: `0.5px solid ${vars.colors.gray20}`,
  borderRadius: 12,
});

export const inviteCodeText = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    flexGrow: 1,
  },
]);

export const copyButton = style({
  position: 'absolute',
  right: 18,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: vars.colors.gray40,
});

export const shareButton = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  width: '100%',
  height: 48,
  backgroundColor: vars.colors.gray10,
  borderRadius: 12,
  border: 'none',
  cursor: 'pointer',
});

export const shareButtonText = style([
  typography.body.b2,
  {
    color: vars.colors.gray80,
  },
]);

export const buttonWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 20,
  backgroundColor: vars.colors.white,
});
