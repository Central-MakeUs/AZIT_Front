import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

const baseCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
  padding: 16,
  backgroundColor: vars.colors.white,
  borderRadius: 12,
});

export const cardDefault = style([
  baseCard,
  {
    border: `1px solid ${vars.colors.blue80}`,
  },
]);

export const cardNormal = style([
  baseCard,
  {
    border: `0.5px solid ${vars.colors.gray20}`,
    cursor: 'pointer',
  },
]);

export const contentSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
  alignItems: 'flex-start',
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

export const buttonRowSingle = style({
  justifyContent: 'flex-end',
});

const baseButton = style([
  typography.body.b3,
  {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 0',
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
    flex: '0 1 50%',
    maxWidth: '50%',
    backgroundColor: vars.colors.white,
    border: `0.5px solid ${vars.colors.blue80}`,
    color: vars.colors.blue80,
  },
]);
