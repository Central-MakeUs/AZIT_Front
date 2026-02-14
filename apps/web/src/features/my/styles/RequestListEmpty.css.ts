import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  width: '100%',
  flex: 1,
  minHeight: 0,
});

export const icon = style({
  flexShrink: 0,
  width: 64,
  height: 64,
  color: vars.colors.gray60,
});

export const message = style([
  typography.body.b2,
  {
    color: vars.colors.gray60,
    textAlign: 'center',
  },
]);
