import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginBottom: '16px',
});

export const titleBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const title = style([
  typography.heading.h3,
  {
    color: vars.colors.black,
  },
]);

export const subtitle = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);

export const list = style({
  display: 'flex',
  flexDirection: 'column',
});

export const crewButton = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});

export const crewInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const crewTextBlock = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
});

export const crewName = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const crewDescription = style([
  typography.body.b4,
  {
    color: vars.colors.gray60,
  },
]);

export const divider = style({
  backgroundColor: vars.colors.gray20,
  marginTop: '14px',
  marginBottom: '14px',
});
