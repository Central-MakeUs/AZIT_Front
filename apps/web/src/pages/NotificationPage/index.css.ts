import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const pageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flexGrow: 1,
  overflowY: 'auto',
});

export const emptyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  width: '100%',
  flex: 1,
});

export const emptyText = style([
  typography.body.b2,
  {
    color: vars.colors.gray60,
  },
]);
