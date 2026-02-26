import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const listContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
});

export const emptyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: 220,
  gap: '16px',
});

export const emptyText = style([
  typography.body.b2,
  {
    color: vars.colors.gray60,
    textAlign: 'center',
  },
]);
