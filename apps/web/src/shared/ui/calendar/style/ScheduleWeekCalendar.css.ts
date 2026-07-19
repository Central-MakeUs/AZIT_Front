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
    textAlign: 'left',
  },
]);

export const calendarHeaderSection = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '8px',
});

export const weekRow = style({
  display: 'flex',
  width: '100%',
});

export const dayCell = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  padding: '8px 0',
  border: '1px solid transparent',
  background: 'transparent',
  cursor: 'pointer',
  borderRadius: '12px',
  gap: '4px',
});

export const dayCellSelected = style({
  borderColor: vars.colors.blue80,
});

export const weekdayLabel = style({
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '1.4',
  color: vars.colors.gray40,
  textAlign: 'center',
});

export const dayNumber = style({
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '1.4',
  color: vars.colors.black,
  textAlign: 'center',
});

export const dotRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2px',
  height: '8px',
});
