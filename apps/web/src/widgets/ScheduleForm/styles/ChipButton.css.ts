import { style } from '@vanilla-extract/css';

export const button = style({
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  display: 'block',
});

export const chipWrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
