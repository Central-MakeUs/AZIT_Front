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
  marginBottom: '16px',
});

export const daysRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '4px',
});

export const dayColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'stretch',
  borderRadius: '12px',
  border: '1px solid transparent',
  padding: '4px 0',
});

export const dayColumnSelected = style({
  border: `1px solid ${vars.colors.blue80}`,
});

export const weekdayLabel = style([
  typography.body.b4,
  {
    color: vars.colors.gray30,
    textAlign: 'center',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
]);

export const weekdayLabelSelected = style({
  color: vars.colors.black,
});

export const dayTile = style({
  height: '48px',
  padding: '10px',
  display: 'grid',
  placeItems: 'center',
  borderRadius: '12px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  width: '100%',
  font: 'inherit',
});

export const dotContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2px',
  height: '6px',
});

export const dotRegular = style({
  width: '6px',
  height: '6px',
  backgroundColor: vars.colors.blue60,
  borderRadius: '100%',
});

export const dotLightning = style({
  width: '6px',
  height: '6px',
  backgroundColor: vars.colors.secondary,
  borderRadius: '100%',
});
