import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const tabRow = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  paddingBottom: 4,
  flexShrink: 0,
  backgroundColor: vars.colors.white,
});

export const tabWrapper = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const tab = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 48,
  padding: '12px 16px',
  boxSizing: 'border-box',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});

export const tabLabel = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    transition: 'color 0.2s ease',
  },
]);

export const tabLabelInactive = style([
  typography.body.b2,
  {
    color: vars.colors.gray50,
    transition: 'color 0.2s ease',
  },
]);

export const tabUnderlineTrack = style({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: 4,
  pointerEvents: 'none',
});

export const tabUnderlineBarMember = style({
  position: 'absolute',
  left: 'calc(25% - 60px)',
  width: 120,
  height: 4,
  backgroundColor: vars.colors.blue80,
  transition: 'left 0.25s ease-in-out',
});

export const tabUnderlineBarRequest = style({
  position: 'absolute',
  left: 'calc(75% - 60px)',
  width: 120,
  height: 4,
  backgroundColor: vars.colors.blue80,
  transition: 'left 0.25s ease-in-out',
});

export const tabDivider = style({
  width: '100%',
  height: 1,
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
});
