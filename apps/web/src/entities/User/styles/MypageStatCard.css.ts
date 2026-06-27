import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const card = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '17px 16px',
  borderRadius: 16,
  border: `1px solid ${vars.colors.blue80}`,
  backgroundColor: vars.colors.white,
});

export const label = style([
  typography.body.b4,
  {
    color: vars.colors.black,
  },
]);

export const value = style([
  typography.body.b2,
  {
    color: vars.colors.blue80,
  },
]);

export const icon = style({
  width: 20,
  height: 20,
});
