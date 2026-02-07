import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 24,
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 8,
});

export const label = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const inputBase = style({
  width: '100%',
  height: 48,
  minHeight: 48,
});

export const addressRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
  width: '100%',
});

export const readOnlyInput = style([
  inputBase,
  style({
    flex: 1,
    minWidth: 0,
    backgroundColor: vars.colors.gray10,
  }),
]);

export const addressSearchButton = style({
  flexShrink: 0,
  width: 120,
  height: 48,
});
