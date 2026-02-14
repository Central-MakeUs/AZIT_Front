import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export const title = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    fontWeight: '600',
  },
]);

export const checkButton = style([
  typography.body.b3,
  {
    color: vars.colors.blue60,
    backgroundColor: 'transparent',
    border: `1px solid ${vars.colors.blue60}`,
    borderRadius: '8px',
    padding: '6px 12px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
]);

export const disabled = style({
  cursor: 'not-allowed',
  backgroundColor: vars.colors.gray10,
  borderColor: vars.colors.gray30,
  color: vars.colors.gray50,
});

export const infoRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

export const label = style([
  typography.body.b3,
  {
    color: vars.colors.gray50,
    minWidth: '80px',
  },
]);

export const value = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);

export const trackingNumberContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const copyButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  color: vars.colors.gray50,
});

export const divider = style({
  width: '100%',
  height: '1px',
  backgroundColor: vars.colors.gray10,
  marginTop: '16px',
});
