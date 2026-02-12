import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderRadius: '12px',
  padding: '16px',
  border: `1px solid ${vars.colors.blue60}`,
});

export const cancelButton = style({
  position: 'absolute',
  top: '12px',
  right: '12px',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  color: vars.colors.gray30,
});

export const optionText = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const shippingText = style([
  typography.body.b3,
  {
    color: vars.colors.gray50,
  },
]);

export const bottomContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginTop: '12px',
});

export const quantitySelector = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const quantitySelectorButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: vars.colors.gray50,
});

export const quantitySelectorCount = style([
  typography.body.b3,
  {
    color: vars.colors.black,
    display: 'flex',
    padding: '4px 12px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    border: `0.5px solid ${vars.colors.gray20}`,
    borderRadius: '8px',
    height: '30px',
    width: '30px',
  },
]);
