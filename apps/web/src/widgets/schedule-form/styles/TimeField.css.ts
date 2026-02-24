import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const timeRow = style({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  gap: 8,
  width: '100%',
});

export const amPmRow = style({
  display: 'flex',
  gap: 6,
  flexShrink: 0,
});

export const timeInputsRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const timeColon = style([
  typography.body.b2,
  {
    color: vars.colors.gray50,
    flexShrink: 0,
  },
]);

export const timeInput = style({
  padding: '6px 12px',
  textAlign: 'center',
  width: '44px',
  borderRadius: '8px',
});
