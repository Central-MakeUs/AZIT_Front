import { typography, vars } from '@azit/design-system';
import { globalStyle, style } from '@vanilla-extract/css';

export const orderPolicyFooter = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '20px 20px 0',
  backgroundColor: vars.colors.background_sub,
  paddingBottom: '50px',
  marginTop: '-12px',
  borderTop: `1px solid ${vars.colors.gray10}`,
});

export const orderPolicyFooterText = style([
  typography.body.b4,
  {
    color: vars.colors.gray70,
  },
]);

export const orderPolicyFooterLinks = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '4px 8px',
  paddingTop: '4px',
});

export const orderPolicyFooterLink = style([
  typography.body.b4,
  {
    color: vars.colors.gray70,
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
]);

export const orderPolicyFooterDivider = style({
  color: vars.colors.gray30,
});

globalStyle(`#refund-policy-dropdown-content ul`, {
  ...vars.typography.body.b4,
  marginTop: 0,
  marginBottom: 0,
  paddingLeft: '1rem',
  listStyleType: 'disc',
  listStylePosition: 'inside',
});

globalStyle(`#refund-policy-dropdown-content ol`, {
  ...vars.typography.body.b4,
  marginTop: 0,
  marginBottom: 0,
  listStyleType: 'decimal',
  listStylePosition: 'inside',
});
