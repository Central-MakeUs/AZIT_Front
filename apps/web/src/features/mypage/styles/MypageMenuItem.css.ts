import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const item = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '14px 16px',
  backgroundColor: 'transparent',
  borderBottom: `1px solid ${vars.colors.gray10}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const label = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);
