import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
});

export const title = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    paddingLeft: 4,
  },
]);

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderRadius: 16,
  overflow: 'hidden',
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.gray10}`,
});
