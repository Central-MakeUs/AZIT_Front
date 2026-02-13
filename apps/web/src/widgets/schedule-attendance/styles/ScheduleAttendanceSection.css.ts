import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

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

export const rippleCircleOuter = style({
  position: 'absolute',
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  backgroundColor: vars.colors.blue60,
  pointerEvents: 'none',
  opacity: 0.1,
});

export const rippleCircleOuterLightning = style({
  position: 'absolute',
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  backgroundColor: vars.colors.grad_secondary,
  pointerEvents: 'none',
  opacity: 1,
});

export const rippleCircleMiddle = style({
  position: 'absolute',
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  backgroundColor: vars.colors.blue60,
  pointerEvents: 'none',
  opacity: 0.3,
});

export const rippleCircleMiddleLightning = style({
  position: 'absolute',
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  backgroundColor: vars.colors.secondary,
  pointerEvents: 'none',
  opacity: 1,
});

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

export const buttonText = style([
  typography.body.b2,
  {
    color: vars.colors.white,
  },
]);

export const distanceText = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    textAlign: 'center',
  },
]);
