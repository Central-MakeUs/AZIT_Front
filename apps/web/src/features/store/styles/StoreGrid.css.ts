import { style } from '@vanilla-extract/css';

export const gridContainer = style({
  display: 'grid',
  flexWrap: 'wrap',
  gap: '12px 11px',
  alignItems: 'flex-start',
  width: '100%',
  gridTemplateColumns: 'repeat(2, 1fr)',
});
