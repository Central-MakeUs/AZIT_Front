import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

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
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const date = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    textWrap: 'wrap',
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

const statusButtonBase = style([
  typography.body.b3,
  {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textWrap: 'nowrap',
  },
]);

export const statusButton = {
  attended: style([
    statusButtonBase,
    {
      backgroundColor: vars.colors.blue60,
      color: vars.colors.white,
    },
  ]),
  attendedLightning: style([
    statusButtonBase,
    {
      backgroundColor: vars.colors.secondary,
      color: vars.colors.black,
    },
  ]),
  absent: style([
    statusButtonBase,
    {
      backgroundColor: vars.colors.gray10,
      color: vars.colors.gray60,
    },
  ]),
};
