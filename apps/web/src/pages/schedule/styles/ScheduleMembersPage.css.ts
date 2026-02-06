import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const contentWrapper = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '12px 20px',
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: vars.colors.background_sub,
});

export const headerSection = style({
  backgroundColor: vars.colors.background_sub,
  flexShrink: 0,
  width: '100%',
});

export const countSection = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});

export const title = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const countRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const count = style([
  typography.body.b2,
  {
    color: vars.colors.blue80,
  },
]);

export const countSuffix = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const memberList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
});

export const shareButton = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
