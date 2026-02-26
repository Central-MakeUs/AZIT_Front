import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const disabledCardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  aspectRatio: '1/1',
  padding: '24px',
  backgroundColor: vars.colors.gray10,
  borderRadius: '24px',
});

export const cardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  aspectRatio: '1/1',
  padding: '24px',
  backgroundColor: '#E5EFFF',
  borderRadius: '24px',
});

export const cardContainerLightning = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  aspectRatio: '1/1',
  padding: '24px',
  backgroundColor: '#EDFBDB',
  borderRadius: '16px',
});

export const title = style([
  typography.heading.h3,
  {
    color: vars.colors.black,
    marginBottom: '4px',
    textAlign: 'center',
  },
]);

export const titleDisabled = style([
  typography.heading.h3,
  {
    color: vars.colors.gray60,
    marginBottom: '4px',
    textAlign: 'center',
  },
]);

export const buttonWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginBottom: '4px',
  position: 'relative',
});

export const rippleContainer = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '220px',
  height: '220px',
  overflow: 'hidden',
});

const rippleCircleBase = style({
  position: 'absolute',
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  pointerEvents: 'none',
});

export const rippleCircleOuter = style([
  rippleCircleBase,
  {
    backgroundColor: vars.colors.blue60,
    opacity: 0.1,
  },
]);

export const rippleCircleOuterDisabled = style([
  rippleCircleBase,
  {
    backgroundColor: vars.colors.gray40,
    opacity: 0.1,
  },
]);

export const rippleCircleOuterLightning = style([
  rippleCircleBase,
  {
    backgroundColor: vars.colors.grad_secondary,
    opacity: 1,
  },
]);

export const rippleCircleMiddle = style([
  rippleCircleBase,
  {
    backgroundColor: vars.colors.blue60,
    opacity: 0.3,
  },
]);

export const rippleCircleMiddleDisabled = style([
  rippleCircleBase,
  {
    backgroundColor: vars.colors.gray40,
    opacity: 0.3,
  },
]);

export const rippleCircleMiddleLightning = style([
  rippleCircleBase,
  {
    backgroundColor: vars.colors.secondary,
    opacity: 1,
  },
]);

export const buttonOuter = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '160px',
  height: '160px',
  borderRadius: '50%',
  background: vars.colors.grad,
  padding: 0,
});

export const buttonOuterLightning = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '160px',
  height: '160px',
  borderRadius: '50%',
  background: vars.colors.grad_secondary,
  padding: 0,
});

export const buttonOuterDisabled = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '160px',
  height: '160px',
  borderRadius: '50%',
  backgroundColor: vars.colors.gray40,
  padding: 0,
});

export const button = style({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundColor: vars.colors.grad,
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
});

export const buttonLightning = style({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundColor: vars.colors.grad_secondary,
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
});

export const buttonDisabled = style({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundColor: vars.colors.gray40,
  border: 'none',
  cursor: 'default',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
});

export const buttonContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'center',
});

export const iconWrapper = style({
  color: vars.colors.white,
});

export const iconWrapperDisabled = style({
  color: vars.colors.gray60,
});

export const buttonText = style([
  typography.body.b2,
  {
    color: vars.colors.white,
  },
]);

export const buttonTextDisabled = style([
  typography.body.b2,
  {
    color: vars.colors.gray60,
  },
]);

export const distanceText = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    textAlign: 'center',
  },
]);

export const distanceTextDisabled = style([
  typography.body.b2,
  {
    color: vars.colors.gray60,
    textAlign: 'center',
  },
]);
