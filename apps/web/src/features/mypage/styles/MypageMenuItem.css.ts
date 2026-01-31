import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const item = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '20px 20px 12px 20px',
  backgroundColor: 'transparent',
  borderBottom: `1px solid ${vars.colors.gray10}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
      paddingBottom: '20px',
    },
  },
});

export const itemClickable = style({
  cursor: 'pointer',
});

export const label = style([
  typography.body.b3,
  {
    color: vars.colors.gray70,
  },
]);
