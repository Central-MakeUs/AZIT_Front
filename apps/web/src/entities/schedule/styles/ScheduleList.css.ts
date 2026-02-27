import { typography, vars } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const listContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
});

export const emptyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 'fit-content',
  minHeight: '220px',
  padding: '10px 0px 100px 0px',
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
