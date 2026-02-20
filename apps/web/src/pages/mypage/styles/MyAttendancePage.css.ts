import { style } from '@vanilla-extract/css';

export const statCardsContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px',
  width: '100%',
  marginBottom: '20px',
});
