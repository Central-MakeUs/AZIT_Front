import { style } from '@vanilla-extract/css';

export const appLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  overflowY: 'hidden',
});
