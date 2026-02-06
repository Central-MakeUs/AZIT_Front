import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const calendarContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const calendarTitle = style([
  typography.body.b1,
  {
    color: vars.colors.black,
    textAlign: 'center',
  },
]);

export const calendarHeaderSection = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '32px',
  marginBottom: '16px',
});

export const calendarHeaderButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
});
