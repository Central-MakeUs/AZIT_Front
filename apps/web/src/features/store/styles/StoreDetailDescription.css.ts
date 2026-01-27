import { style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'flex-start',
  width: '240px',
});

export const title = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    width: '100%',
  },
]);

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-start',
  width: '100%',
  listStyle: 'disc',
  paddingLeft: '21px',
  paddingBottom: '26px',
});

export const listItem = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);
