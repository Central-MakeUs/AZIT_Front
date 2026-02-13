import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const navigationWrapper = style({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '480px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const navigationContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '66px',
  padding: '10px 20px',
  backgroundColor: vars.colors.white,
  borderTop: `1px solid ${vars.colors.gray10}`,
  overflow: 'hidden',
});

export const menuItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  height: '50px',
  overflow: 'hidden',
  position: 'relative',
});

export const menuItemContent = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  alignItems: 'center',
});

export const iconWrapper = style({
  width: '24px',
  height: '24px',
  overflow: 'hidden',
  position: 'relative',
  flexShrink: 0,
});

export const menuLabel = style([
  typography.body.b4,
  {
    textAlign: 'center',
    width: '64px',
    flexShrink: 0,
  },
]);

export const menuLabelActive = style({
  color: vars.colors.blue80,
});

export const menuLabelInactive = style({
  color: vars.colors.gray30,
});

export const homeIndicator = style({
  width: '100%',
  backgroundColor: vars.colors.white,
  aspectRatio: '400/34',
  position: 'relative',
  flexShrink: 0,
});

export const homeIndicatorBar = style({
  position: 'absolute',
  bottom: '8px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '144px',
  height: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const homeIndicatorInner = style({
  width: '144px',
  height: '5px',
  backgroundColor: vars.colors.black,
  borderRadius: '100px',
});
