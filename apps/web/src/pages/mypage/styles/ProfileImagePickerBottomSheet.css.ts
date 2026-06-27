import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const list = style({
  listStyle: 'none',
  margin: 0,
  padding: '0 0 16px',
});

export const item = style([
  typography.body.b2_m,
  {
    width: '100%',
    padding: '16px 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: vars.colors.black,
    textAlign: 'left',
    selectors: {
      '&:active': {
        backgroundColor: vars.colors.gray10,
      },
    },
  },
]);
