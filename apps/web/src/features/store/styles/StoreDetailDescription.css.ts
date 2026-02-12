import { globalStyle, style } from '@vanilla-extract/css';
import { vars, typography } from '@azit/design-system';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'flex-start',
  width: '100%',
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
  listStyle: 'none',
  paddingLeft: 0,
  paddingBottom: '26px',
});

export const description = style([
  typography.body.b3,
  {
    color: vars.colors.black,
    width: '100%',
    whiteSpace: 'pre-wrap',
  },
]);

globalStyle('div > li', {
  listStyleType: 'disc',
  listStylePosition: 'inside',
});

export const listItem = style({
  width: '100%',
});

export const detailImage = style({
  width: '100%',
  display: 'block',
  objectFit: 'contain',
});
