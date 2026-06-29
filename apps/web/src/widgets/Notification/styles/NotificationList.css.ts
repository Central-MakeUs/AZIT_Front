import { vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const listContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

export const filterContainer = style({
  position: 'sticky',
  top: 0,
  backgroundColor: vars.colors.background_sub,
  padding: '16px 20px',
});

export const itemsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  padding: '0 20px',
});
