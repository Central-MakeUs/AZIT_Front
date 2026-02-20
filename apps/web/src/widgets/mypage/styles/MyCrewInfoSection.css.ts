import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const card = style({
  width: '100%',
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.gray10}`,
  borderRadius: 16,
});

export const cardHeader = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  padding: '12px 16px',
});

export const avatar = style({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
  objectFit: 'cover',
});

export const cardFooter = style({
  display: 'flex',
  borderTop: `1px solid ${vars.colors.gray10}`,
});

export const crewName = style([
  typography.body.b2,
  {
    color: vars.colors.black,
    flexShrink: 0,
  },
]);

export const crewJoinInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
});

export const copyContent = style([
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: `1px solid ${vars.colors.gray10}`,
    color: vars.colors.gray70,
    padding: '12px 0',
    flex: 1,
    gap: 6,
  },
]);

export const iconWrap = style({
  width: 16,
  height: 16,
});

export const copyIcon = style({
  color: vars.colors.gray40,
});

export const shareContent = style([
  crewJoinInfo,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.colors.blue60,
    padding: '12px 0',
    flex: 1,
  },
]);

export const shareIcon = style({
  color: vars.colors.blue60,
});
