import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const item = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 16px',
  borderRadius: 12,
  border: `0.5px solid ${vars.colors.gray20}`,
  backgroundColor: vars.colors.white,
});

export const text = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);
