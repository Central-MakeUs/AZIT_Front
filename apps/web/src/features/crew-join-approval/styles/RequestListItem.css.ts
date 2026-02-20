import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 140,
  padding: 16,
  backgroundColor: vars.colors.white,
  border: `0.5px solid ${vars.colors.gray10}`,
  borderRadius: 12,
  boxSizing: 'border-box',
});

export const topRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
});

export const avatar = style({
  flexShrink: 0,
  width: 56,
  height: 56,
  borderRadius: '50%',
  backgroundColor: vars.colors.gray10,
  objectFit: 'cover',
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  flex: 1,
  minWidth: 0,
});

export const nickname = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const requestDate = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);

export const buttonRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  marginTop: 'auto',
  paddingTop: 16,
});

export const rejectButton = style([
  typography.body.b3,
  {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    padding: '8px 0',
    backgroundColor: vars.colors.white,
    border: `0.5px solid ${vars.colors.gray20}`,
    borderRadius: 8,
    color: vars.colors.gray60,
    cursor: 'pointer',
  },
]);

export const approveButton = style([
  typography.body.b3,
  {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    padding: '8px 0',
    backgroundColor: vars.colors.blue80,
    border: 'none',
    borderRadius: 8,
    color: vars.colors.white,
    cursor: 'pointer',
  },
]);
