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

export const calendarWrapper = style({
  width: '100%',
  overflow: 'hidden',
  transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
});
