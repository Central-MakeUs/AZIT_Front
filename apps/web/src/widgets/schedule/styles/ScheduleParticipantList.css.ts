import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
});

export const headerRow = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const titleBlock = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});

export const moreLink = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 2,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
});

export const moreText = style([
  typography.body.b4,
  {
    color: vars.colors.gray50,
  },
]);

export const participantList = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  overflowX: 'auto',
  gap: 0,
  paddingTop: 4,
});
