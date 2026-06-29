import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  paddingBottom: 66,
});

export const message = style([
  typography.body.b2,
  {
    color: vars.colors.gray60,
    marginTop: 12,
  },
]);
