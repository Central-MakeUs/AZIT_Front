import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const listContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

export const itemsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  padding: '0 20px',
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  width: '100%',
  flex: 1,
});

export const emptyStateIcon = style({
  color: vars.colors.gray50,
});

export const emptyStateText = style([
  typography.body.b2,
  {
    color: vars.colors.gray50,
    textAlign: 'center',
  },
]);
