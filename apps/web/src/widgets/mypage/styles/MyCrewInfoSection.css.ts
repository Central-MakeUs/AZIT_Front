import { vars, typography } from '@azit/design-system';
import { style } from '@vanilla-extract/css';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
});

export const sectionHeader = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 4px',
});

export const sectionTitle = style([
  typography.body.b2,
  {
    color: vars.colors.black,
  },
]);

export const newCrewButton = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  selectors: {
    '&:disabled': {
      cursor: 'default',
    },
  },
});

export const newCrewText = style([
  typography.body.b3,
  {
    color: vars.colors.blue60,
    selectors: {
      [`${newCrewButton}:disabled &`]: {
        color: vars.colors.gray40,
      },
    },
  },
]);

export const newCrewIcon = style({
  color: vars.colors.blue60,
  selectors: {
    [`${newCrewButton}:disabled &`]: {
      color: vars.colors.gray40,
    },
  },
});

export const crewList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const crewCard = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px 16px 16px',
  backgroundColor: vars.colors.white,
  borderRadius: 16,
});

export const crewCardLeft = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  flex: 1,
  minWidth: 0,
});

export const crewAvatar = style({
  width: 44,
  height: 44,
  borderRadius: '50%',
  backgroundColor: vars.colors.gray10,
  flexShrink: 0,
  objectFit: 'cover',
});

export const crewInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minWidth: 0,
});

export const crewName = style([
  typography.body.b3,
  {
    color: vars.colors.black,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
]);

export const crewNamePending = style([
  typography.body.b3,
  {
    color: vars.colors.gray60,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
]);

export const roleBadge = style([
  typography.body.b4,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px 8px',
    backgroundColor: vars.colors.blue60,
    borderRadius: 8,
    color: vars.colors.white,
    width: 'fit-content',
  },
]);

export const pendingBadge = style([
  typography.body.b4,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px 8px',
    backgroundColor: vars.colors.gray20,
    borderRadius: 8,
    color: vars.colors.gray60,
    width: 'fit-content',
  },
]);

export const iconButton = style({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  selectors: {
    '&:disabled': {
      opacity: 0.5,
    },
  },
});

export const chevronIcon = style({
  color: vars.colors.gray60,
});

export const closeIcon = style({
  color: vars.colors.gray60,
});
