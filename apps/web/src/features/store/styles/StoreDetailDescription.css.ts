import { vars, typography } from '@azit/design-system';
import { globalStyle, style } from '@vanilla-extract/css';

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
  position: 'relative',
});

export const detailImage = style({
  width: '100%',
  display: 'block',
  objectFit: 'contain',
});

export const moreInfoButton = style([
  typography.body.b1,
  {
    width: '100vw',
    transform: 'translateX(-50%)',
    transformOrigin: 'center bottom',
    height: '114px',
    background: `linear-gradient(to bottom, transparent 0%, ${vars.colors.white} 53.07%)`,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: '4px',
    cursor: 'pointer',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    padding: '0 20px',
    color: vars.colors.blue80,
    textAlign: 'center',
  },
]);
