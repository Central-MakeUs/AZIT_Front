import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100dvh',
  width: '100%',
  gap: 20,
  padding: 24,
  textAlign: 'center',
});

export const message = style([
  typography.body.b2,
  {
    color: vars.colors.gray60,
  },
]);

export const retryButton = style([
  typography.body.b2,
  {
    color: vars.colors.white,
    backgroundColor: vars.colors.blue80,
    border: 'none',
    borderRadius: 12,
    padding: '12px 24px',
    cursor: 'pointer',
  },
]);
