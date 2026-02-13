import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const refundPolicyDropdown = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.white,
});

export const refundPolicyDropdownTrigger = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  gap: '8px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  textAlign: 'left',
});

export const refundPolicyDropdownLabel = style([
  typography.body.b3,
  {
    color: vars.colors.gray100,
  },
]);

export const refundPolicyDropdownContent = style([
  typography.body.b4,
  {
    color: vars.colors.gray70,
    lineHeight: 1.5,
    padding: '20px',
    whiteSpace: 'pre-wrap',
    backgroundColor: vars.colors.background_sub,
  },
]);
