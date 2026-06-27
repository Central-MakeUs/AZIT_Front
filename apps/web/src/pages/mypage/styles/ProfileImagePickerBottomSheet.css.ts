import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const list = style({
  listStyle: 'none',
  margin: 0,
  padding: '0 0 16px',
});

export const item = style([
  typography.body.b2_medium,
  {
    width: '100%',
    padding: '18px 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: vars.colors.black,
    textAlign: 'left',
    gap: '12px',
    display: 'flex',
    alignItems: 'center',
    selectors: {
      '&:active': {
        backgroundColor: vars.colors.gray10,
      },
    },
  },
]);
