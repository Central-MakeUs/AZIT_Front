import { style } from '@vanilla-extract/css';
import { vars } from '@azit/design-system';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderRadius: 12,
  backgroundColor: vars.colors.white,
  overflow: 'hidden',
  border: `1px solid ${vars.colors.gray10}`,
});
