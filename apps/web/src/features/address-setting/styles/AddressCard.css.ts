import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
  padding: 16,
  backgroundColor: vars.colors.white,
  borderRadius: 12,
  border: `0.5px solid ${vars.colors.gray20}`,
});

export const contentSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
});

export const recipientRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

export const recipientName = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const recipientPhone = style([
  typography.body.b2,
  {
    color: vars.colors.gray70,
  },
]);

export const addressText = style([
  typography.body.b2,
  {
    color: vars.colors.gray70,
    wordBreak: 'break-all',
  },
]);

export const buttonRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 11,
  width: '100%',
});

const baseButton = style([
  typography.body.b3,
  {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 60px',
    borderRadius: 8,
    cursor: 'pointer',
  },
]);

export const deleteButton = style([
  baseButton,
  {
    backgroundColor: vars.colors.white,
    border: `0.5px solid ${vars.colors.gray20}`,
    color: vars.colors.gray60,
  },
]);

export const editButton = style([
  baseButton,
  {
    backgroundColor: vars.colors.blue80,
    border: `0.5px solid ${vars.colors.blue80}`,
    color: vars.colors.white,
  },
]);
