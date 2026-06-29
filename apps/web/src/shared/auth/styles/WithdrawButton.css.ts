import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const withdrawButton = style([
  typography.body.b3,
  {
    width: 'fit-content',
    padding: '4px',
    textAlign: 'center',
    color: vars.colors.gray50,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
]);
