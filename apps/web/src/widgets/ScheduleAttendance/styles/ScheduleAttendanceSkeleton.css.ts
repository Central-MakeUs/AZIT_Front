import { vars } from '@azit/design-system';
import { keyframes, style } from '@vanilla-extract/css';

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.5 },
});

const skeletonBase = style({
  backgroundColor: vars.colors.gray20,
  borderRadius: '4px',
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

export const container = style({
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

export const titleLine = style([
  skeletonBase,
  {
    width: '60%',
    maxWidth: 180,
    height: '20px',
    marginBottom: '4px',
  },
]);

export const buttonWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginBottom: '4px',
});

export const rippleContainer = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '220px',
  height: '220px',
});

export const buttonCircle = style([
  skeletonBase,
  {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
  },
]);

export const distanceLine = style([
  skeletonBase,
  {
    width: 120,
    height: 14,
  },
]);
