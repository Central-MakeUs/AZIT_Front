import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

export const title = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const description = style({
  width: '100%',
  alignItems: 'flex-start',
});

export const inputDescription = style({
  width: '100%',
  alignItems: 'center',
});

export const label = style([
  typography.body.b3,
  {
    color: vars.colors.gray60,
    flexShrink: 0,
    marginRight: '12px',
  },
]);

export const bankValue = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
});

export const value = style([
  typography.body.b3,
  {
    color: vars.colors.black,
    width: '100%',
  },
]);

export const accountNumber = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

export const copyButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});
