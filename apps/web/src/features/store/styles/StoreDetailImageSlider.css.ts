import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const imageContainer = style({
  position: 'relative',
  width: '100vw',
  height: '375px',
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
  overflow: 'hidden',
  touchAction: 'pan-y pinch-zoom',
});

export const track = style({
  display: 'flex',
  height: '100%',
  transition: 'transform 0.3s ease-out',
  willChange: 'transform',
});

export const slide = style({
  width: '100vw',
  height: '100%',
  flexShrink: 0,
});

export const slideImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const navButton = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
  color: vars.colors.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer',
  zIndex: 1,
  padding: 0,
});

export const navButtonPrev = style({
  left: '12px',
});

export const navButtonNext = style({
  right: '12px',
});

export const bottomArea = style({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: '20px',
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '12px',
  zIndex: 1,
});

export const imageCounter = style([
  typography.body.b4,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    height: '24px',
    padding: '2px 10px',
    borderRadius: '4px',
    backgroundColor: vars.colors.gray50,
    color: vars.colors.white,
  },
]);

export const dots = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
});

export const dot = style({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: vars.colors.gray30,
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  transition: 'background-color 0.2s, transform 0.2s',
});

export const dotActive = style({
  backgroundColor: vars.colors.white,
  transform: 'scale(1.25)',
});
