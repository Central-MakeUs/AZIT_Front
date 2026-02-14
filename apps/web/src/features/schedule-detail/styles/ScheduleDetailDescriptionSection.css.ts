import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const section = style({
  width: '100%',
  marginBottom: '8px',
});

export const description = style([
  typography.body.b3,
  {
    color: vars.colors.black,
    whiteSpace: 'pre-line',
  },
]);
