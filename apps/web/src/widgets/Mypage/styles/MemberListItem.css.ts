import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const card = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: 88,
  padding: '16px 0',
  boxSizing: 'border-box',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  flex: 1,
  minWidth: 0,
});

export const contentRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
});

export const avatar = style({
  flexShrink: 0,
  width: 56,
  height: 56,
  borderRadius: '50%',
  backgroundColor: vars.colors.gray10,
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  flex: 1,
  minWidth: 0,
  marginLeft: 16,
});

export const nameRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

export const nickname = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const joinDate = style([
  typography.body.b3,
  {
    color: vars.colors.gray60,
  },
]);

export const removeButton = style({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  marginLeft: 16,
  width: 20,
  height: 20,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  color: vars.colors.gray40,
});
