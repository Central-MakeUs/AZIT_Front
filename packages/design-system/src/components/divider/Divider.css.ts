import { style } from '@vanilla-extract/css';
import { vars } from '../../shared/styles';

export const divider = style({
  width: '100%',
  height: 1,
  backgroundColor: vars.colors.gray20,
  minHeight: 1,
});
