import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const itemContainer = style({
  display: 'flex',
  gap: '16px',
  width: '100%',
  flexShrink: 0,
  backgroundColor: vars.colors.white,
  borderRadius: '16px',
  overflow: 'hidden',
  alignItems: 'stretch',
});

export const dateContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '63px',
  padding: '16px',
  gap: '0',
});

export const date = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    textAlign: 'center',
  },
]);

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: 1,
  minWidth: 0,
  padding: '16px 16px 16px 0',
});

export const badgeRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '6px',
});

const badgeBase = style([
  typography.body.b4,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 8px',
    borderRadius: '8px',
    fontWeight: '400',
  },
]);

export const badge = {
  regular: style([
    badgeBase,
    {
      backgroundColor: vars.colors.blue60,
      color: vars.colors.white,
    },
  ]),
  lightning: style([
    badgeBase,
    {
      backgroundColor: vars.colors.secondary,
      color: vars.colors.black,
    },
  ]),
  absent: style([
    badgeBase,
    {
      backgroundColor: vars.colors.gray20,
      color: vars.colors.gray70,
    },
  ]),
};

export const title = style([
  typography.body.b3,
  {
    color: vars.colors.black,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: '500',
  },
]);

export const detailsContainer = style({
  display: 'flex',
  gap: '14px',
  alignItems: 'center',
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
