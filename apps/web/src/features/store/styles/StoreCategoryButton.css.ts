import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const categoryButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px 12px',
  borderRadius: '24px',
  backgroundColor: vars.colors.blue80,
  cursor: 'pointer',
});

export const categoryButtonText = style([
  typography.body.b3,
  {
    color: vars.colors.white,
    textAlign: 'center',
  },
]);
