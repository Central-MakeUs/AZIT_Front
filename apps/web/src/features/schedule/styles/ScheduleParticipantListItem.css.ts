import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const item = style({
  display: 'flex',
  flexShrink: 0,
});

export const itemHorizontal = style({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

export const profileWrapper = style({
  position: 'relative',
  flexShrink: 0,
});

export const leaderBadge = style({
  position: 'absolute',
  right: 0,
  bottom: 0,
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: vars.colors.blue80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const leaderBadgeStar = style({
  display: 'block',
  width: 14,
  height: 14,
  color: vars.colors.secondary,
});

export const itemVertical = style({
  flexDirection: 'column',
  alignItems: 'center',
  gap: 6,
  padding: '12px 8px',
});

export const infoRow = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
});

export const nicknameHorizontal = style([
  typography.body.b3,
  {
    color: vars.colors.black,
  },
]);

export const nicknameVertical = style([
  typography.body.b4,
  {
    color: vars.colors.black,
    textAlign: 'center',
    maxWidth: 64,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
]);
