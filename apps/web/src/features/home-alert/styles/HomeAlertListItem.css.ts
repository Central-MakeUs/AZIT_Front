import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const itemContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '12px',
  width: '100%',
  padding: '16px',
  backgroundColor: vars.colors.white,
  borderRadius: '16px',
  border: `1px solid ${vars.colors.gray10}`,
});

export const itemContainerUnread = style({
  border: `1px solid ${vars.colors.blue60}`,
});

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  flex: 1,
  minWidth: 0,
});

export const mainText = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  flexWrap: 'wrap',
});

export const dateText = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);

export const descriptionText = style([
  typography.body.b4,
  {
    color: vars.colors.gray60,
  },
]);

export const timestampText = style([
  typography.body.b4,
  {
    color: vars.colors.gray60,
    flexShrink: 0,
  },
]);
