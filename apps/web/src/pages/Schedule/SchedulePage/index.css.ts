import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const crewSelectButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
});

export const crewName = style([
  typography.heading.h3,
  {
    color: vars.colors.black,
    whiteSpace: 'nowrap',
  },
]);

export const headerTitle = style([
  typography.heading.h3,
  {
    color: vars.colors.black,
  },
]);

export const emptyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 'fit-content',
  minHeight: '220px',
  padding: '30px 0px 100px 0px',
  gap: '16px',
});

export const emptyText = style([
  typography.body.b2,
  {
    color: vars.colors.gray60,
  },
]);

export const addScheduleButton = style({
  width: 'fit-content',
  padding: '0 30px',
});

export const calendarPersistentHeader = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '16px',
});

export const calendarPersistentTitle = style([
  typography.body.b1,
  {
    color: vars.colors.black,
  },
]);

export const calendarNavButtons = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const calendarNavButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
});

export const calendarWrapper = style({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
});

export const calendarMonthlyLayer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
});

export const calendarAnimWrapper = style({
  overflow: 'hidden',
  transition: 'max-height 0.32s ease',
  maxHeight: '200px',
});

export const calendarAnimWrapperExpanded = style({
  maxHeight: '420px',
});
