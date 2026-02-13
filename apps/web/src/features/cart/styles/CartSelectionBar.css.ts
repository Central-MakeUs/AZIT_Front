import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '12px 20px',
});

export const leftSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const selectionText = style([
  typography.body.b3,
  {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    color: vars.colors.gray50,
  },
]);

export const deleteButton = style([
  typography.body.b3,
  {
    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    color: vars.colors.black,
    cursor: 'pointer',
  },
]);
