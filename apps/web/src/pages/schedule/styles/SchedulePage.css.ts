import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const crewSelectButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
});

export const crewName = style([
  typography.heading.h3,
  {
    color: vars.colors.black,
    whiteSpace: 'nowrap',
  },
]);

export const headerTitle = style([
  typography.heading.h3,
  {
    color: vars.colors.black,
  },
]);
