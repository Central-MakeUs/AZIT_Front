import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
});

export const button = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: vars.colors.gray50,
});

export const quantityDisplay = style([
  typography.body.b3,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    padding: '4px 12px',
    border: `0.5px solid ${vars.colors.gray20}`,
    borderRadius: 8,
    color: vars.colors.black,
    textAlign: 'center',
  },
]);

export const quantityDisplayDisabled = style({
  color: vars.colors.gray50,
});
