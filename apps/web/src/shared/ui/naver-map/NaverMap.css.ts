import { style } from '@vanilla-extract/css';

export const MarkerIconWrapper = style({
  pointerEvents: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -100%)',
  zIndex: 10,
  width: 48,
  height: 48,
});
