import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const itemContainer = style({
  display: 'flex',
  gap: '16px',
  width: '100%',
  padding: '16px',
  backgroundColor: vars.colors.white,
  borderRadius: '16px',
  border: `1px solid ${vars.colors.gray10}`,
  alignItems: 'center',
});

export const dateContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexShrink: 0,
});

export const date = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1,
  minWidth: 0,
});

export const title = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
]);

export const detailsContainer = style({
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
});

export const detailItem = style({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
});

export const detailText = style([
  typography.body.b4,
  {
    color: vars.colors.gray50,
  },
]);

export const statusButton = {
  attended: style({
    backgroundColor: vars.colors.blue80,
    color: vars.colors.white,
  }),
  attendedAlt: style({
    backgroundColor: vars.colors.secondary,
    color: vars.colors.black,
  }),
  absent: style({
    backgroundColor: vars.colors.gray10,
    color: vars.colors.black,
  }),
};
