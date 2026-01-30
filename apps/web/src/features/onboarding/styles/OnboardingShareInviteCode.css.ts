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

export const headerSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  width: 255,
});

export const profileSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
});

export const crewName = style([
  typography.heading.h2,
  {
    color: vars.colors.black,
    textAlign: 'center',
    width: '100%',
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

export const copyIcon = style({
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
  color: vars.colors.gray60,
});

export const shareIcon = style({
  color: vars.colors.gray60,
});

export const shareButtonText = style({
  fontFamily: 'Apple SD Gothic Neo, sans-serif',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: 1.5,
  color: vars.colors.gray80,
});

export const buttonWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  padding: '0 20px',
  backgroundColor: vars.colors.white,
});
