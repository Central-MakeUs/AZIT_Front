import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const itemContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const leftSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const labelContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const label = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const requiredBadge = style([
  typography.body.b2,
  {
    color: vars.colors.blue80,
  },
]);

export const optionalBadge = style([
  typography.body.b2,
  {
    color: vars.colors.gray40,
  },
]);

export const navigationButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: vars.colors.gray40,
});
