import { style } from '@vanilla-extract/css';

export const mainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flexGrow: 1,
  overflowY: 'auto',
});
